import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  TemplateRef,
} from "@angular/core";
import { GridMaterialColumnComponent } from "./grid-material-column.component";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { DatePipe } from "@angular/common";
import { SelectionModel } from "@angular/cdk/collections";


export interface ExportColumn {
  field: string;
  caption?: string;
  dataType?: "string" | "date" | "number" | "boolean" | "currency"| "link";
  dataTypeFormat?: string;
}

@Component({
  selector: "app-grid-material",
  templateUrl: "./grid-material.component.html",
  styleUrls: ["./grid-material.component.scss"],
})
export class GridMaterialComponent
  implements OnInit, AfterViewInit, AfterContentInit {

  /* table responsive */
  @Input() public enableResponsive : boolean = false;

    /* Référence du template affichant le détail d'une ligne */
    /* Référence du template affichant le détail d'une ligne */

  @Input()
  public collapseDetail!: TemplateRef<any>;
    @Input() public activateCollapseRow: boolean = false;
    public activateCollapseAllRow: boolean = false;
    public collapseAmount: number = 0;
    public collapseColumnName = "collapseCol";


  /* Données */
  @Input() set dataSource(data: any[]) {
    this.dataLength = data ? data.length : 0;

    if(this.activateCollapseRow){
      data = data.map((d) => {
        return { ...d, isExpanded: false, isRowCollapse : ( d.isRowCollapse === true || d.isRowCollapse === undefined ? true : false) };
      });
    }

    if (this.dataLength > 0) {
      if (!this.internalDataSource) {
        if (data) {
          let dataSource = data;
          this.internalDataSource = new MatTableDataSource(dataSource);
        }
      } else {
        this.internalDataSource.data = data;
        this.initPaginatorAndSort();
        if (this.multiEdition) {
          this.selection.clear();
        }
        this.selection.clear();
        this.table.renderRows();
      }
    } else {
      this.internalDataSource = new MatTableDataSource(data);
    }

  }

  public internalDataSource!: MatTableDataSource<any>;

  /* Gestion du trie surt les colonnes */
  @Input() public enableSort = false;
  @ViewChild(MatSort, { static: false })
  public sort!: MatSort;

  @ViewChild(MatTable, { static: false })
  public table!: MatTable<any>;

  /* Liste des colonnes */
  /* Liste des colonnes */

  @ContentChildren(GridMaterialColumnComponent)
  public columns!: QueryList<GridMaterialColumnComponent>;
  public displayedColumns: string[] = [];

  /* Nom de la clefs primaire*/
  /* Nom de la clefs primaire*/

  @Input()
  public primaryField!: string;

  /* Liste des colonnes en mode édition */
  public editingItems: any[] = [];

  /* Gestion de l'insertion */
  /* Ajout du formulaire directement dans le tableau */
  @Input() public enableInlineInsert = false;
  /* Le formulaire est exclu du tableau*/
  @Input() public enableInsert = false;
  /* Action sur lajout d'une nouvelle donnée */
  @Output() onInsert: EventEmitter<any> = new EventEmitter();
  public inserting = false;

  /* Pagination */
  @Input() public enablePagination = false;
  @ViewChild(MatPaginator, { static: false })
  public paginator!: MatPaginator;
  @Input() public pageSizeOptions: number[] = [10, 25, 50, 100, 250];
  @Input() public pageSize = 10;
  public dataLength = 0;

  @Input() public enableFilter = false;

  /* Exporter les données du tableau */
  @Input() public enableExport = false;
  @Input() public exportColumns: ExportColumn[] = [];
  @Input() public exportName = "export.csv";

  /* Edition multiple */
  @Input() public multiEdition = false;
  public selection = new SelectionModel<any>(true, []);
  @Input()
  public templateMultiEdition!: TemplateRef<any>;
  public mutliEditionColumnName = "multiEditionCol";

  /* footer */
  @Input() public enableFooter = false;

  /* Actions supplementaires */
  /* Actions supplementaires */

  @Input()
  public tepmplateActionsSupplementaires!: TemplateRef<any>;

  @Input() public enableExpandColumn: boolean = false;
  @Input() public expandColumns: boolean = false;
  
  @Input() public enableRefresh: boolean = false;
  @Output() onRefresh: EventEmitter<any> = new EventEmitter();
  
  @Input() public persisteVisibilityMultiActions = false; 

  public emptyDataReference: any;

  constructor(
    private datePipe: DatePipe,
    /*private fileExportService: FileExportService*/
  ) {
    this.saveSuccessCallback = this.saveSuccessCallback.bind(this);
    this.saveCancelCallback = this.saveCancelCallback.bind(this);
    this.enregistrer = this.enregistrer.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  ngOnInit() {
    if (!this.primaryField) {
      throw new Error("primaryField obligatoire !");

    }
  }

  ngAfterViewInit(): void {
    this.initPaginatorAndSort();

    this.internalDataSource.filterPredicate = (item: any, filter) => {
      const flatLine = this.columns.filter(c => !!c.field && !c.expandable).map(c => {
        const data = this.getData(item, c.field);
        if (c.dataType === "date" && data) {
          return this.datePipe.transform(data, c.dataTypeFormat);
        }
        return data;
      }).join(';').toLowerCase();
      console.log("flat", flatLine);
      return flatLine.includes(filter);
    };

  }

  ngAfterContentInit(): void {

    this.displayedColumns = this.columns
      .filter((x) => !x.expandable)
      .map((column: GridMaterialColumnComponent) => {
        return column.name;
      });

    if (this.activateCollapseRow === true) {
      this.displayedColumns.unshift(this.collapseColumnName);
    }

    if(this.multiEdition === true){
      this.displayedColumns.unshift(this.mutliEditionColumnName);
    }

    this.emptyDataReference = this.columns.reduce((json: any, value, key) => {
      if (value.field) {
        json[value.field] = undefined;
      }
      return json;
    }, {});
  }

    // Handle events
    refreshData(): void {
      this.onRefresh.emit(event);
    }

  private initPaginatorAndSort(): void {
    setTimeout(() => {
      if (this.sort && this.enableSort && this.dataLength > 0) {
        this.internalDataSource.sort = this.sort;
        this.internalDataSource.sortingDataAccessor = (item, property) => {
          return this.getData(item, property);
        };
      }
      if (this.paginator && this.enablePagination) {
        this.internalDataSource.paginator = this.paginator;
      }

    });
  }

  saveSuccessCallback(data: any) {
    data.editing = false;
    const source = this.internalDataSource.data;
    const index = source.findIndex(
      (x) => x[this.primaryField] === data[this.primaryField]
    );
    source[index] = Object.assign({}, data);

    this.internalDataSource.data = source;

    this.table.renderRows();
    delete this.editingItems[data[this.primaryField]];
  }

  saveCancelCallback(data: any) {
    this.cancel(data);
  }

  delete(column: GridMaterialColumnComponent, data: any): void {
    if (confirm(column.confirmDelete) && column.onDelete) {
      column.onDelete.emit(data);
    }
  }

  edit(column: GridMaterialColumnComponent, data: any): void {
    this.editingItems[data[this.primaryField]] = { ...data };
    if (column.enableInlineEdit) {
      data.editing = true;
    } else if (column.enableEdit) {
      data.editing = false;
      column.onEdit.emit({
        data: data,
        success: this.saveSuccessCallback,
        cancel: this.saveCancelCallback,
      });
    }
  }

  insert(): void {
    if (this.enableInsert) {
      this.onInsert.emit();
    } else if (this.enableInlineInsert && !this.inserting) {
      this.inserting = true;
      const source = this.internalDataSource?.data;
      source.unshift(Object.assign({ editing: true }, this.emptyDataReference));
      this.internalDataSource.data = source;
    }

    if (this.internalDataSource) {
      this.table.renderRows();
    }
  }

  enregistrer(column: GridMaterialColumnComponent, data: any): void {
    if (this.inserting) {
      this.inserting = false;
      this.onInsert.emit(data);
    } else if (column.onEdit) {
      column.onEdit.emit({
        data: data,
        success: this.saveSuccessCallback,
        cancel: this.saveCancelCallback,
      });
    }
  }

  cancel(data: any): void {
    if (this.inserting && !data[this.primaryField]) {
      this.inserting = false;
      const source = this.internalDataSource.data;
      this.internalDataSource.data = source.filter((x) => x[this.primaryField]);
    } else if (data[this.primaryField]) {
      data.editing = false;
      const source = this.internalDataSource.data;
      const index = source.findIndex(
        (x) => x[this.primaryField] === data[this.primaryField]
      );
      source[index] = Object.assign(
        {},
        this.editingItems[data[this.primaryField]]
      );
      this.internalDataSource.data = source;
      delete this.editingItems[data[this.primaryField]];
    } else {
      this.inserting = false;
      data.editing = false;
      const source = this.internalDataSource.data;
      const index = source.findIndex(
        (x) => x[this.primaryField] === data[this.primaryField]
      );
      this.internalDataSource.data = source.splice(index, 1);
    }

    this.table.renderRows();
  }

  getTotals(columnName: string) {
    if (this.dataLength > 0) {
      if (
        this.internalDataSource?.filteredData &&
        this.internalDataSource?.filteredData.length > 0
      ) {
        return this.internalDataSource?.filteredData
          .map((d) => this.getData(d, columnName))
          .reduce((prev_value, value) => prev_value + value);
      } else {
        return 0;
      }
    }
    return 0;
  }

  filtrerDataSource(event: any): void {
    let value = event.target.value;
    this.internalDataSource.filter = value.trim().toLowerCase();
  }

  /* Exporter les données du tableau */
  exporter(): void {
    let columns: ExportColumn[];
    if (this.exportColumns && this.exportColumns.length > 0) {
      columns = this.exportColumns;
    } else {
      if (this.expandColumns) {
        columns = this.columns
          .filter((c) => !!c.field)
          .map((c) => {
            const col: ExportColumn = {
              field: c.field,
              caption: c.caption,
              dataType: c.dataType,
              dataTypeFormat: c.dataTypeFormat,
            };
            return col;
          });
      } else {
        columns = this.columns
          .filter((c) => !!c.field && !c.expandable)
          .map((c) => {
            const col: ExportColumn = {
              field: c.field,
              caption: c.caption,
              dataType: c.dataType,
              dataTypeFormat: c.dataTypeFormat,
            };
            return col;
          });
      }
    }

    const data = this.flat(this.internalDataSource.filteredData, columns);
    /*this.fileExportService.exportCSV(this.exportName, data);*/
  }

  /* Construction du fichier à exporter sous format .csv*/
  private flat(data: any[], columns: ExportColumn[]): any {
    if (!data) {
      return null;
    }

    const header = columns
      .filter((c) => !!c.caption)
      .map((c) => {
        return c.caption;
      })
      .join(";");

    const lignes = data.map((item) => {
      const ligne = columns
        .map((c) => {
          const data = this.getData(item, c.field);
          if (c.dataType === "date" && data) {
            return this.datePipe.transform(data, c.dataTypeFormat, 'UTC');
          }
          return data;
        })
        .join(";");
      return ligne;
    });

    return header + "\r\n" + lignes.join("\r\n");
  }

  /* Action selection */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.internalDataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.internalDataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }

  onChangePage(event: any): void {
    console.log(event);
  }

  etendreColonnes(): void {
    this.expandColumns = !this.expandColumns;
    if (this.expandColumns) {
      this.displayedColumns = this.columns.map(
        (column: GridMaterialColumnComponent) => {
          return column.name;
        }
      );
    } else {
      this.displayedColumns = this.columns
        .filter((x) => !x.expandable)
        .map((column: GridMaterialColumnComponent) => {
          return column.name;
        });
    }

    if (this.multiEdition) {
      this.displayedColumns.unshift(this.mutliEditionColumnName);
    }
    if (this.activateCollapseRow === true) {
      this.displayedColumns.unshift(this.collapseColumnName);
    }
  }

  expandCollapse(row:any) {
    if (row.isExpanded) {
      row.isExpanded = false;
      this.collapseAmount--;
    } else {
      row.isExpanded = true;
      this.collapseAmount++;
    }
    if (this.collapseAmount > 0) {
      this.activateCollapseAllRow = true;
    } else {
      this.activateCollapseAllRow = false;
    }
  }

  expandAllCollapse() {
    if (this.activateCollapseAllRow) {
      this.activateCollapseAllRow = false;
    } else {
      this.activateCollapseAllRow = true;
    }

    if (this.internalDataSource) {
      this.internalDataSource.filteredData.map(
        (c) => ( c.isRowCollapse ?  c.isExpanded = this.activateCollapseAllRow :  c.isExpanded = false )
      );
    }
  }

  getData(element: any, field: string) {
    if (field) {
      const fields = field.split(".");
      let resultat = element;
      for (let i = 0; i < fields.length; i++) {
        resultat = resultat[fields[i]];
      }

      return resultat;
    }
  }
}

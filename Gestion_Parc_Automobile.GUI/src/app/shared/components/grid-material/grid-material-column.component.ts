import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

export interface EventWithCallback<T> {
  data: T;
  success: (data: T) => void;
  cancel: (data: T) => void;
};

@Component({
  selector: 'app-column-material',
  template: ''
})
// tslint:disable-next-line: component-class-suffix
export class GridMaterialColumnComponent implements OnInit {

  @Input()
  public name!: string;
  @Input()
  public field!: string;
  @Input()
  public caption!: string;
  @Input() public dataType: 'string' | 'date' | 'number' | 'boolean' | 'currency' | 'link' = 'string';
  @Input()
  public dataTypeFormat!: string;
  @Input() public editable = false;
  @Input() public enableEdit = false;
  @Input() public enableInlineEdit = false;
  @Input() public enableInlineInsert = false;
  @Input() public enableDelete = false;
  @Input() public enableSort = true;
  @Input() public enableSelect = false;
  @Input() public enableFooter = false;
  @Input() public enabledTranslate = false;

  @Input()
  public templateUpdate!: TemplateRef<any>;
  @Input()
  public template!: TemplateRef<any>;
  @Input()
  public templateFooter!: TemplateRef<any>;
  @Input() public data: any;

  /* Permet de cacher la colonne */
  @Input() public expandable: boolean = false;

  @Input() public noWrap = true;

  @Input() public confirmDelete = 'Etes-vous sure de vouloir supprimer cet item ?';

  @Input() public condition: (column: GridMaterialColumnComponent, data: any) => boolean = () => true;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GridMaterialColumnComponent } from './grid-material-column.component';
import { GridMaterialComponent } from './grid-material.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    GridMaterialColumnComponent,
    GridMaterialComponent,
 ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports : [
    FontAwesomeModule,
    GridMaterialColumnComponent,
    GridMaterialComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GridMaterialModule {
  constructor(public library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
 }

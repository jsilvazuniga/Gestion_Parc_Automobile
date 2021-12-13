import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridMaterialModule } from './components/grid-material/grid-material.module';

// Importing font awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GridMaterialModule,
    FontAwesomeModule
  ],
  exports: [
    RouterModule ,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GridMaterialModule,
    FontAwesomeModule
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule {
  constructor(public library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
 }

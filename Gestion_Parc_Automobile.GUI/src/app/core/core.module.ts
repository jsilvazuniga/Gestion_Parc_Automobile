import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InterceptorsModule } from './services/interceptors/interceptors.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    InterceptorsModule,
  ],
  exports: [
    SharedModule
  ]
})
export class CoreModule { }

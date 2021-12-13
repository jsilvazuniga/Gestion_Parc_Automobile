import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VoitureComponent } from './voiture/voiture.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { VoitureFormComponent } from './voiture/voiture-form/voiture-form.component';


@NgModule({
  declarations: [
    VoitureComponent,
    VoitureFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule ,
    SharedModule
  ]
})
export class AdminModule { }

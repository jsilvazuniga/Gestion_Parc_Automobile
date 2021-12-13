import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { RouterModule } from '@angular/router';
import { MyReservesComponent } from './my-reserves/my-reserves.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReserverFormComponent } from './my-reserves/reserver-form/reserver-form.component';


@NgModule({
  declarations: [
    MyReservesComponent,
    ReserverFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule ,
    SharedModule
  ]
})
export class ClientModule { }

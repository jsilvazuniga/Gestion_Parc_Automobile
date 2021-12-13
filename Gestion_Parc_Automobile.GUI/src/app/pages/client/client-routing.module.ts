import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservesComponent } from './my-reserves/my-reserves.component';

const routes: Routes = [ { path: 'MyReserves', component: MyReservesComponent  },                         
                         {
                            path: '',
                            redirectTo: 'MyReserves',
                            pathMatch: 'full'
                         }
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

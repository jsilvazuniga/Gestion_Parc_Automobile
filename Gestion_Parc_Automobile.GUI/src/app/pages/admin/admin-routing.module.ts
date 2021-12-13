import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoitureComponent } from './voiture/voiture.component';

const routes: Routes = [ { path: 'Voiture', component: VoitureComponent  },                         
                         {
                            path: '',
                            redirectTo: 'Voiture',
                            pathMatch: 'full'
                         }
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

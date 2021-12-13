import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'Gestion',
    component: PagesComponent,
    children : [ 
    {
      path: 'Admin',
      loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    },
    {
      path: 'Client',
      loadChildren: () => import('./client/client.module').then(mod => mod.ClientModule )
     }
    ]
  },
  {
    path: '',
    redirectTo: '/Gestion',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

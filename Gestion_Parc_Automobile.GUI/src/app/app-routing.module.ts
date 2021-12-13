import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [  { path: 'security', component: SecurityComponent },
                          { path: 'Gestion', component: PagesComponent },
                          { path: '',  redirectTo: 'Gestion', pathMatch: 'full' }, ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

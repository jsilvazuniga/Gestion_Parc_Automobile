import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewComponent } from './new/new.component';
import { SecurityComponent } from './security.component';

const routes: Routes = [ { path: 'security', component: SecurityComponent,
                          children: [
                            { path : 'login', component : LoginComponent },
                            { path : 'new', component : NewComponent },
                          ] },                         
                         {
                            path: '',
                            redirectTo: 'security/login',
                            pathMatch: 'full'
                         }
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }

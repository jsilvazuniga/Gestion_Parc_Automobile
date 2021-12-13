import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { NewComponent } from './new/new.component';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    LoginComponent,
    NewComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,
    CoreModule
  ]
})
export class SecurityModule { }

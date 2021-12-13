import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpTokenInterceptorService } from './http-token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { REDIRECT_STORAGE, TOKEN_STORAGE } from '../security/authentication.service';
import { RouterModule } from '@angular/router';
import { API_BASE_URL } from '../core.service';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: TOKEN_STORAGE, useValue: environment.tokenStorage
    },
    {
      provide: API_BASE_URL, useValue: environment.api_base_url
    }, 
    {
      provide: REDIRECT_STORAGE, useValue: environment.redirectStorage
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorService, multi: true
    }
  ]
})
export class InterceptorsModule { }

import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from './../core.service';
import { TOKEN_STORAGE } from './../security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptorService  implements HttpInterceptor {

  private tokenSorageName : string ;
  constructor(@Inject(TOKEN_STORAGE) tokenStorage?: string) {
                this.tokenSorageName = tokenStorage as string;

            }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jsonInfoToken = sessionStorage.getItem(this.tokenSorageName);

    const token: TokenResponse = JSON.parse(jsonInfoToken as string);


    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token.access_token,
          'Accept-Language':  'fr-FR',
          'Cache-Control': 'no-cache, no-store, must-revalidate, private',
          Pragma: 'no-cache',
          Expires: '0'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Accept-Language': 'fr-FR',
          'Cache-Control': 'no-cache, no-store, must-revalidate, private',
          Pragma: 'no-cache',
          Expires: '0'
        }
      });
    }
    return next.handle(req);
  }
}

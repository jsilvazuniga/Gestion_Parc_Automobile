import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Service, TokenResponse, UtilisateurLoginRequestDto } from '../core.service';

export const TOKEN_STORAGE = new InjectionToken<string>('TOKEN_STORAGE');
export const REDIRECT_STORAGE = new InjectionToken<string>('REDIRECT_STORAGE');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private application: string;
  public tokenStorage: string;

  public operateurConnected :any;

  protected isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(  private _router: Router, 
    private _authenticationService : Service,
    @Inject(TOKEN_STORAGE) _tokenStorage?: string ) {

    this.tokenStorage = _tokenStorage as string;
    this.application = "gestion parc mobile";
  }


  obtenirTokenFromLogin(email: string, password : string ) : Observable<TokenResponse>{
    let session = this;
    var loginRequest = new UtilisateurLoginRequestDto();
    loginRequest.email = email;
    loginRequest.password = password;
    return this._authenticationService.loginUtilisateur(loginRequest).pipe(
      tap((resp: any) => {
        sessionStorage.setItem(this.tokenStorage, JSON.stringify(resp));
        session.isAuthenticated.next(true);
      }),
      catchError((resp: any) => {
        sessionStorage.removeItem(this.tokenStorage);
        session.isAuthenticated.next(false);
        return of(resp);
      })
    );

  }

signOut() {
 sessionStorage.removeItem(this.tokenStorage);
  this.isAuthenticated.next(false);
  window.location.href = "/security/login";
}


authorize() {
  //window.location.href = "/security/Login";
    this._router.navigate(['/security/login']); 
}

obtenirTokenInSessionStorage(): TokenResponse {
  let token ;
  if (this.tokenStorage) {
    const tokenString = sessionStorage.getItem(this.tokenStorage);
    if(tokenString!=null){
      token = new TokenResponse(JSON.parse(tokenString));
    }
  }
  return token as TokenResponse;
}

isAuthorized(): boolean {
 // return this.isAuthenticated.value;
 const tokenString = sessionStorage.getItem(this.tokenStorage);
  if(tokenString!== null){ return true;}
 return false;
}

  authorized(value: boolean): Observable<boolean> {
    if (value !== this.isAuthenticated.value) {
      this.isAuthenticated.next(value);
    }
    return this.isAuthenticated;
  }

  obtenirOperateurFromToken() {

    let promise = new Promise((resolve, reject) => {
      if(this.operateurConnected){
        resolve(this.operateurConnected);
      }else{
        this._authenticationService.obtenirUtilisateurIdentity().subscribe((operateur) => { 
          if(operateur){
            resolve(operateur);
          }else{
            reject(operateur);
          }
          this.operateurConnected =  operateur;
        });
      }

    });

    return promise;

  }
}

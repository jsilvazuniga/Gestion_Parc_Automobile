import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurResponseDto } from '../core/services/core.service';
import { AuthenticationService } from '../core/services/security/authentication.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public operateur!: UtilisateurResponseDto;

  constructor( private _router: Router,
    private _authenticationCoreService: AuthenticationService,) { }

  ngOnInit(): void {

    let existeObtenirOperateur : Boolean = false;

    existeObtenirOperateur = (this._authenticationCoreService.isAuthorized());

   if (existeObtenirOperateur) {
      this._authenticationCoreService.obtenirOperateurFromToken().then(data => {
        this.operateur = data as UtilisateurResponseDto;
        console.log(this.operateur );
      });
    } else {
      this._authenticationCoreService.authorize();
    }
  }

    logout(){
      this._authenticationCoreService.signOut();
    }

    voitures(){
      this._router.navigate(['/Gestion/Admin/Voiture']); 
    }

    myReserves(){
      this._router.navigate(['/Gestion/Client/MyReserves']); 
    }

  }



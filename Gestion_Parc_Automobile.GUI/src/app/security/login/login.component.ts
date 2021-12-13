import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formDetail!: FormGroup;
  public labelMSN: string = "";

  constructor( private fb: FormBuilder, private _authenticationService:  AuthenticationService ) { }

  ngOnInit(): void {
   
    this.formDetail = this.fb.group({
      InputEmail : [null, Validators.required],
      InputPassword : [null, Validators.required],
    });

  }


  Login(){

    
    if(!this.formDetail.valid){return;}    

    this.labelMSN = "";
    let email = this.formDetail.controls['InputEmail'].value;
    let password = this.formDetail.controls['InputPassword'].value;

    this._authenticationService.obtenirTokenFromLogin(email, password).subscribe((data) => {

      if( data && this._authenticationService.isAuthorized() ) {
        location.href = '/Gestion';
      }else{
        console.error("login incorrect!");
        this.labelMSN = "login incorrect!";
      }
  
    });
  }

  New(){
    location.href = '/security/new';
  }

  
}

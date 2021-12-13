import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service, UtilisateurRequestDto } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public formDetail!: FormGroup;
  public labelMSN: string = "";
  public estUserCreated : boolean = false;

  public utilisateur!: UtilisateurRequestDto;

  constructor( private fb: FormBuilder, private _service : Service ) { }

  ngOnInit(): void {
    
    this.formDetail = this.fb.group({
      inputName : [null, Validators.required],
      inputLastName : [null, Validators.required],
      InputEmail : [null, Validators.required],
      InputPassword : [null, Validators.required],
    });

  }

  Create(){
    this.labelMSN = "";
    if(!this.formDetail.valid){return;}    

    this.utilisateur = new UtilisateurRequestDto(); 
    this.utilisateur.name =this.formDetail.controls['inputName'].value;
    this.utilisateur.lastName = this.formDetail.controls['inputLastName'].value;
    this.utilisateur.email = this.formDetail.controls['InputEmail'].value;
    this.utilisateur.password = this.formDetail.controls['InputPassword'].value;


    this._service.createUtilisateur(this.utilisateur).subscribe((data) => {

      if(data){
        this.estUserCreated = true;

      }else {
        this.labelMSN = "compte incorrect!";
        console.error(this.labelMSN);
      }
  
    });
  }

  Cancel(){
    location.href = '/security/login';
  }
}

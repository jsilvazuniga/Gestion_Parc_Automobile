import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColeurResponseDto, MarqueResponseDto, ModeleResponseDto, Service, StatutResponseDto, VoitureRequestDto } from 'src/app/core/services/core.service';
import { VoitureResponseDtoExtend } from 'src/app/shared/models/models';

@Component({
  selector: 'app-voiture-form',
  templateUrl: './voiture-form.component.html',
  styleUrls: ['./voiture-form.component.css']
})
export class VoitureFormComponent implements OnInit {

  public formVoiture!: FormGroup;
  public isCreation = true;
  public infoVoiture!: VoitureResponseDtoExtend;

  public listeColeurs : ColeurResponseDto[] = [];
  public listeMarques : MarqueResponseDto[] = [];
  public listeModeles : ModeleResponseDto[] = [];
  public listeStatut : StatutResponseDto[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<VoitureFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _services: Service) { 

      if (this.data) {
        this.isCreation = false;
        this.infoVoiture = this.data.data as VoitureResponseDtoExtend;
      } else {
        this.isCreation = true;      
      }
    }

  ngOnInit(): void {

    console.log(this.infoVoiture);

    this.formVoiture = this.fb.group({
      inputId : [this.infoVoiture?.id],
      inputName : [this.infoVoiture?.name, Validators.required],
      inputKilometrage : [this.infoVoiture?.kilometrage, Validators.required],
      inputDateMiseEnCirculation: [ this.infoVoiture?.dateMiseEnCirculation, Validators.required],
      inputColeur : [this.infoVoiture?.coleur?.id, Validators.required],
      inputMarque : [this.infoVoiture?.marque?.id, Validators.required],
      inputModele : [this.infoVoiture?.modele?.id, Validators.required],
      inputStatut : [this.infoVoiture?.statut?.id, Validators.required],
      inputPuissance : [this.infoVoiture?.puissance, Validators.required],
      inputDetaille : [this.infoVoiture?.detaille],

    });

    this.obtenirInformation();

  }


  enregistrer() {

    if(!this.formVoiture.valid){return;}    

    let objCreateVoiture = new VoitureRequestDto();
    
    objCreateVoiture.id =  ( this.isCreation === false ? this.formVoiture.controls['inputId'].value : 0);
    objCreateVoiture.dateMiseEnCirculation =  this.formVoiture.controls['inputDateMiseEnCirculation'].value;
    objCreateVoiture.idColeur =  this.formVoiture.controls['inputColeur'].value;
    objCreateVoiture.idMarque =  this.formVoiture.controls['inputMarque'].value;
    objCreateVoiture.idModele =  this.formVoiture.controls['inputModele'].value;
    objCreateVoiture.idStatut =  this.formVoiture.controls['inputStatut'].value;
    objCreateVoiture.kilometrage =  this.formVoiture.controls['inputKilometrage'].value;
    objCreateVoiture.name =  this.formVoiture.controls['inputName'].value;
    objCreateVoiture.puissance =  this.formVoiture.controls['inputPuissance'].value;

    this.dialogRef.close(objCreateVoiture);
  }

  annuler(){
    this.dialogRef.close(null);
  }

  obtenirInformation(){
    this._services.coleur().subscribe((coleurs:ColeurResponseDto[]) => {
      this.listeColeurs = coleurs;
    });

    this._services.marque().subscribe((marques: MarqueResponseDto[]) => {
      this.listeMarques = marques;
    });

    this._services.modele().subscribe((modeles: ModeleResponseDto[]) => {
      this.listeModeles = modeles;
    });

    this._services.statut().subscribe((statuts: StatutResponseDto[]) => {
      this.listeStatut = statuts;
    });
  }
  

}

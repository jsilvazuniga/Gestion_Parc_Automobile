import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReservationRequestDto, Service, UtilisateurResponseDto, VoitureRequestDto, VoitureResponseDto } from 'src/app/core/services/core.service';
import { AuthenticationService } from 'src/app/core/services/security/authentication.service';
import { VoitureResponseDtoExtend } from 'src/app/shared/models/models';
import { ReserverFormComponent } from '../../client/my-reserves/reserver-form/reserver-form.component';
import { VoitureFormComponent } from './voiture-form/voiture-form.component';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {

  public dataSource: VoitureResponseDtoExtend[] = [];
  public isManager: boolean = false;

  constructor(private dialogService: MatDialog,
              private _service : Service, private _authenticationCoreService: AuthenticationService) { 

    _authenticationCoreService.obtenirOperateurFromToken().then(( data: any) => {
      this.isManager = ( data?.idProfil === 1);
      console.log(this.isManager);
    });


  }

  ngOnInit(): void {
    this.obtenirVoitures();


  }

  obtenirVoitures(){
    this._service.voiture().subscribe((data : VoitureResponseDto[]) => {
      this.dataSource = data.map( c => new VoitureResponseDtoExtend(c));
    });
  }

  editDetail(event:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '92vw';
    dialogConfig.data = event;
    const dialogRef = this.dialogService.open(VoitureFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: VoitureRequestDto) => {
        if (result) {
          this._service.ajouterVoiture(result).subscribe((data) => {
            if(data){
              this.obtenirVoitures();
            }
          });
        }
      });
  }

  deleteVoiture(event:any) {
    this._service.supprimerVoiture(event.id).subscribe((data) => {
      this.obtenirVoitures();
    });
  }

  onCreateReserve(event:VoitureResponseDtoExtend) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '92vw';
    dialogConfig.data = event;
    const dialogRef = this.dialogService.open(ReserverFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: ReservationRequestDto) => {
        if (result) {
          result.idVoiture = event.id;
          this._service.createReserve(result).subscribe((data) => {
            if(data){
              this.obtenirVoitures();
            }
          });
        }
      });
  }
 
}

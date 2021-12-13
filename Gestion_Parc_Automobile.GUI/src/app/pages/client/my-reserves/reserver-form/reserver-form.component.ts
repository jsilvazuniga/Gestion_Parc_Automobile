import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ReservationRequestDto } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-reserver-form',
  templateUrl: './reserver-form.component.html',
  styleUrls: ['./reserver-form.component.css']
})
export class ReserverFormComponent implements OnInit {

  public formReservation!: FormGroup;
  public currentDate: Date = new Date();
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ReserverFormComponent>) { }

  ngOnInit(): void {
    this.formReservation = this.fb.group({
      pickerDateDebut : [null, Validators.required],
      pickerDateFin : [null, Validators.required],
    });
  }

  enregistrer() {

    if(!this.formReservation.valid){return;}    

    let objCreateReserve = new ReservationRequestDto();
    objCreateReserve.dateDebut =  this.formReservation.controls['pickerDateDebut'].value;
    objCreateReserve.dateFin = this.formReservation.controls['pickerDateFin'].value;
    
    this.dialogRef.close(objCreateReserve);
  }

  annuler(){
    this.dialogRef.close(null);
  }

}

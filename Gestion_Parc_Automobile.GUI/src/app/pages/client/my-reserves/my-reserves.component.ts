import { Component, OnInit } from '@angular/core';
import { ReservationResponseDto, Service } from 'src/app/core/services/core.service';
import { ReservationResponseDtoExtend } from 'src/app/shared/models/models';

@Component({
  selector: 'app-my-reserves',
  templateUrl: './my-reserves.component.html',
  styleUrls: ['./my-reserves.component.css']
})
export class MyReservesComponent implements OnInit {

  public dataSource: ReservationResponseDtoExtend[] = [];

  constructor( private _service : Service ) { }

  ngOnInit(): void {
    this.obtenirVoitures();
  }

  obtenirVoitures(){
    this._service.getMyReservations().subscribe((data : ReservationResponseDto[]) => {
      console.log(data);
      this.dataSource = data.map( c => new ReservationResponseDtoExtend(c));
    });
  }

}

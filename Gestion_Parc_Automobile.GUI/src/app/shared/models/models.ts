import { ReservationResponseDto, VoitureResponseDto } from "src/app/core/services/core.service";

export class VoitureResponseDtoExtend extends VoitureResponseDto {

    public marqueName!: string;
    public modeleName!: string;
    public coleurName!: string;
    public statutName!: string;

    public estReserve: boolean = false;

    constructor(data: VoitureResponseDto) {
        super(data);
        
        if(this.marque){ this.marqueName = this.marque.name;  }
        if(this.coleur){ this.coleurName = this.coleur?.name;  }
        if(this.modele){ this.modeleName = this.modele.name;  }
        if(this.statut){ this.statutName = this.statut.name;  this.estReserve = (this.statut.id === 1 ); }
    }
}

export class ReservationResponseDtoExtend extends ReservationResponseDto {

    public codeVoiture!: number;
    public nomVoiture! :string;

    constructor(data :ReservationResponseDto) {
        super(data);
        
        if(this.voiture){ 
            this.nomVoiture = this.voiture.name as string;  
            this.codeVoiture = this.voiture.id as number;
        }
    }
}
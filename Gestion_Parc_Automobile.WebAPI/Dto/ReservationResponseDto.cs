using AutoMapper;
using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Dto
{
    public class ReservationResponseDto
    {
        public int Id { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public virtual UtilisateurResponseDto Utilisateur { get; set; }
        public virtual VoitureResponseDto Voiture { get; set; }

        public ReservationResponseDto()
        {

        }
        public ReservationResponseDto(IMapper mapper, Reservation entity)
        {
            Id = entity.Id;
            DateDebut = entity.DateDebut;
            DateFin = entity.DateFin;

            Utilisateur = new UtilisateurResponseDto();
            if(entity.Utilisateur != null)
            {
                Utilisateur = mapper.Map<UtilisateurResponseDto>(entity.Utilisateur);
            }

            Voiture = new VoitureResponseDto();
            if (entity.Voiture != null)
            {
                Voiture = mapper.Map<VoitureResponseDto>(entity.Voiture);
            }


        }
    }
}

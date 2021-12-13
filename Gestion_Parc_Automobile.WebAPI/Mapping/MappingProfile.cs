using AutoMapper;
using Gestion_Parc_Automobile.Metier.Models;
using Gestion_Parc_Automobile.WebAPI.Dto;
using Gestion_Utilisateur.Metier.Models;

namespace Gestion_Parc_Automobile.WebAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Soruce -> target
            CreateMap<Coleur, ColeurResponseDto>();
            CreateMap<Marque, MarqueResponseDto>();
            CreateMap<Modele, ModeleResponseDto>();
            CreateMap<Statut, StatutResponseDto>();

            CreateMap<VoitureRequestDto, Voiture>();
            CreateMap<Voiture, VoitureResponseDto>();

            CreateMap<Reservation, ReservationResponseDto>();
            CreateMap<ReservationRequestDto, Reservation>();
            
            CreateMap<Utilisateur, UtilisateurResponseDto>();
            CreateMap<UtilisateurRequestDto, Utilisateur>();
            CreateMap<UtilisateurLoginRequestDto, Utilisateur>(); 
        }
        
    }

}

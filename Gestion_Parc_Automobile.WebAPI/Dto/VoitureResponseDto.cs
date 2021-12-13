using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Dto
{
    public class VoitureResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Kilometrage { get; set; }

        public int Puissance { get; set; }
        public DateTime DateMiseEnCirculation { get; set; }
        public string Detaille { get; set; }
        public bool Active { get; set; } = true;

        public virtual Statut Statut { get; set; }
        public virtual Modele Modele { get; set; }
        public virtual Marque Marque { get; set; }
        public virtual Coleur Coleur { get; set; }
    }
}

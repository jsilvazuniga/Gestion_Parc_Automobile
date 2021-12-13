using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Dto
{
    public class VoitureRequestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Kilometrage { get; set; }

        public int Puissance { get; set; }

        public DateTime DateMiseEnCirculation { get; set; }

        public string Detaille { get; set; }

        public int? IdStatut { get; set; }
        public int? IdModele { get; set; }
        public int? IdMarque { get; set; }
        public int? IdColeur { get; set; }
    }
}

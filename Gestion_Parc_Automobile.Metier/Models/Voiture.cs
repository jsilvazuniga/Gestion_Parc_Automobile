using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Models
{
    public class Voiture
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Kilometrage { get; set; }

        [Required]
        public int Puissance { get; set; }
        public string Detaille { get; set; }
        public bool Active { get; set; } = true;

        public DateTime? DateMiseEnCirculation { get; set; }

        public int? IdStatut { get; set; }
        public int? IdModele { get; set; }
        public int? IdMarque { get; set; }
        public int? IdColeur { get; set; }


        [ForeignKey("IdStatut")]
        public virtual Statut Statut { get; set; }

        [ForeignKey("IdModele")]
        public virtual Modele Modele { get; set; }

        [ForeignKey("IdMarque")]
        public virtual Marque Marque { get; set; }

        [ForeignKey("IdColeur")]
        public virtual Coleur Coleur { get; set; }

    }
}

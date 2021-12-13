using Gestion_Utilisateur.Metier.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Models
{
    public class Reservation
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int IdVoiture { get; set; }

        [Required]
        public int IdUtilisateur { get; set; }

        [Required]
        public DateTime DateDebut{ get; set; }

        [Required]
        public DateTime DateFin { get; set; }

        [ForeignKey("IdUtilisateur")]
        public virtual Utilisateur Utilisateur { get; set; }

        [ForeignKey("IdVoiture")]
        public virtual Voiture Voiture { get; set; }
    }
}

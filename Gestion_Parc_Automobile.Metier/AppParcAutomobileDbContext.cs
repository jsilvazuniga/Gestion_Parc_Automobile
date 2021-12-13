using Gestion_Parc_Automobile.Metier.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier
{
    public class AppParcAutomobileDbContext : DbContext
    {
        public AppParcAutomobileDbContext(DbContextOptions<AppParcAutomobileDbContext> opt) : base(opt)
        {

        }

        public DbSet<Voiture> Voitures { get; set; }
        public DbSet<Marque> Marques { get; set; }
        public DbSet<Modele> Modeles { get; set; }
        public DbSet<Statut> Statuts { get; set; }
        public DbSet<Coleur> Coleurs { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

    }
}

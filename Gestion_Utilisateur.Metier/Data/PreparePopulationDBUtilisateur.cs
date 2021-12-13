using Gestion_Utilisateur.Metier;
using Gestion_Utilisateur.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Data
{
    public static class PreparePopulationDBUtilisateur
    {
        public static void SeedData(AppGestionUtilisateurDbContext context)
        {
            SeedDataUtilisateur(context);
        }

        private static void SeedDataUtilisateur(AppGestionUtilisateurDbContext context)
        {
            if (!context.Utilisateurs.Any())
            {
                Console.WriteLine("--> Seeding Utilisateur data... ");

                context.Utilisateurs.AddRange(
                   new Utilisateur() { Name = "Administrateur", Email = "admin@test.com", Password = "password", IdProfil = 1 },
                   new Utilisateur() { Name = "User 1", Email = "user1@test.com", Password ="password", IdProfil = 2 }
                );

                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("--> We already have data Statuts");
            }
        }

    
    }
}

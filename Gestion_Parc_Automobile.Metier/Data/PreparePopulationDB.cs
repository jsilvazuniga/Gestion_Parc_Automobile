using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Data
{
    public static class PreparePopulationDB
    {
        public static void SeedData(AppParcAutomobileDbContext context)
        {
            SeedDataStatut(context);
            SeedDataColeur(context);
            SeedDataModele(context);
            SeedDataMarque(context);
            SeedDataVoiture(context);
        }

        private static void SeedDataStatut(AppParcAutomobileDbContext context)
        {
            if (!context.Statuts.Any())
            {
                Console.WriteLine("--> Seeding Statuts data... ");

                context.Statuts.AddRange(
                   new Statut() { Name = "Disponible" },
                   new Statut() { Name = "Reserve" }
                );

                context.SaveChanges();

            }
            else
            {
                Console.WriteLine("--> We already have data Statuts");
            }
        }

        private static void SeedDataColeur(AppParcAutomobileDbContext context)
        {
            if (!context.Coleurs.Any())
            {
                Console.WriteLine("--> Seeding Coleur data... ");

                context.Coleurs.AddRange(
                   new Coleur() { Name = "Red" },
                   new Coleur() { Name = "Green" },
                   new Coleur() { Name = "Black" }
                );

                context.SaveChanges();

            }
            else
            {
                Console.WriteLine("--> We already have data Coleur");
            }
        }

        private static void SeedDataModele(AppParcAutomobileDbContext context)
        {
            if (!context.Modeles.Any())
            {
                Console.WriteLine("--> Seeding Modele data... ");

                context.Modeles.AddRange(
                   new Modele() { Name = "Cabriolet" },
                   new Modele() { Name = "Sedan" },
                   new Modele() { Name = "Coupe" },
                   new Modele() { Name = "Pickup" }
                );

                context.SaveChanges();

            }
            else
            {
                Console.WriteLine("--> We already have data Modele");
            }
        }

        private static void SeedDataMarque(AppParcAutomobileDbContext context)
        {
            if (!context.Marques.Any())
            {
                Console.WriteLine("--> Seeding Marques data... ");

                context.Marques.AddRange(
                   new Marque() { Name = "Toyota" },
                   new Marque() { Name = "Tesla" },
                   new Marque() { Name = "Honda" },
                   new Marque() { Name = "Mercedes Benz" },
                   new Marque() { Name = "Audi" }
                ) ;

                context.SaveChanges();

            }
            else
            {
                Console.WriteLine("--> We already have data Marques");
            }
        }

        private static void SeedDataVoiture(AppParcAutomobileDbContext context)
        {
            if (!context.Voitures.Any())
            {
                Console.WriteLine("--> Seeding voitures data... ");

                context.Voitures.AddRange(
                   new Voiture() { Name = "Voiture A001", DateMiseEnCirculation = DateTime.Now, Detaille = "Test voiture",
                                    IdColeur = 1, IdMarque = 1, IdModele = 1, IdStatut = 1,
                                    Kilometrage = 515 },
                    new Voiture()
                    {
                        Name = "Voiture A0021",
                        DateMiseEnCirculation = DateTime.Now,
                        Detaille = "Test voiture FF",
                        IdColeur = 2,
                        IdMarque = 3,
                        IdModele = 1,
                        IdStatut = 1,
                        Kilometrage = 755
                    },
                    new Voiture()
                    {
                        Name = "Voiture A002",
                        DateMiseEnCirculation = DateTime.Now,
                        Detaille = "Test voiture BB",
                        IdColeur = 1,
                        IdMarque = 2,
                        IdModele = 3,
                        IdStatut = 1,
                        Kilometrage = 255
                    }
                );

                context.SaveChanges();

            }
            else
            {
                Console.WriteLine("--> We already have data Marques");
            }
        }
    }
}

using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Repository
{
    public class VoitureRepository : IVoitureRepository
    {
        private readonly AppParcAutomobileDbContext _context;

        public VoitureRepository(AppParcAutomobileDbContext context)
        {
            _context = context;
        }

        public Voiture Create(Voiture entite)
        {
            if (entite == null)
            {
                throw new ArgumentNullException(nameof(entite));
            }

             _context.Voitures.Add(entite);

            return entite;
        }

        public IEnumerable<Voiture> GetAll()
        {           
            var result =_context.Voitures
                .Include(m => m.Statut)
                .Include(m => m.Modele)
                .Include(m => m.Marque)
                .Include(m => m.Coleur).ToList();

            return (result.Where(c => c.Active == true));
        }


        public Voiture GetId(int id)
        {
            return _context.Voitures
                .Include(m => m.Statut)
                .Include(m => m.Modele)
                .Include(m => m.Marque)
                .Include(m => m.Coleur)
                .FirstOrDefault(p => p.Id == id && p.Active == true);
        }

        public Voiture Update(Voiture entite)
        {
            if (entite == null)
            {
                throw new ArgumentNullException(nameof(entite));
            }

            _context.Voitures.Update(entite);

            return entite;
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void SupprimerVoiture(int idVoiture)
        {
            Voiture voiture = GetId(idVoiture);
            if(voiture != null)
            {
                voiture.Active = false;
            }
        }

        public void ChangerKilometrage(int idVoiture, int kilometrage)
        {
            Voiture voiture = GetId(idVoiture);
            if (voiture != null)
            {
                voiture.Kilometrage = kilometrage;
            }
        }
    }
}

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
    public class ReserveRepository : IReserveRepository
    {
        private readonly AppParcAutomobileDbContext _context;

        public ReserveRepository(AppParcAutomobileDbContext context)
        {
            _context = context;
        }

        public bool CreateReserve(Reservation reserve)
        {
            //voiture disponible
           var voiture = _context.Voitures.FirstOrDefault(c => c.Id == reserve.IdVoiture && c.Statut.Id == 1);

            if(voiture != null && reserve != null)
            {
                voiture.IdStatut = 2;

                _context.Update(voiture);
                _context.Add(reserve);

                return true;
            }
            return false;
        }

        public IEnumerable<Reservation> GetAll()
        {
           return  _context.Reservations.ToList();
        }

        public IEnumerable<Reservation> GetAllByUtilisateur(int idUtilisateur)
        {
            return _context.Reservations.Where(c => c.IdUtilisateur == idUtilisateur)
                                        .Include(d => d.Voiture).ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}

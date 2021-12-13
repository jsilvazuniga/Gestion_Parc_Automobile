using Gestion_Utilisateur.Metier;
using Gestion_Utilisateur.Metier.Contracts;
using Gestion_Utilisateur.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Repository
{
    public class UtilisateurRepository : IUtilisateurRepository
    {
        private readonly AppGestionUtilisateurDbContext _context;

        public UtilisateurRepository(AppGestionUtilisateurDbContext context)
        {
            _context = context;
        }

        public Utilisateur Create(Utilisateur entite)
        {
            if (entite == null)
            {
                throw new ArgumentNullException(nameof(entite));
            }
            else
            {
                validateEntity(entite);
            }

            _context.Utilisateurs.Add(entite);

            return entite;
        }

        public IEnumerable<Utilisateur> GetAll()
        {
            return _context.Utilisateurs.ToList();
        }

        public Utilisateur GetId(int id)
        {
            return _context.Utilisateurs.FirstOrDefault(p => p.Id == id);
        }

        public Utilisateur Update(Utilisateur entite)
        {
            if (entite == null)
            {
                throw new ArgumentNullException(nameof(entite));
            }

            _context.Utilisateurs.Update(entite);

            return entite;
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        private void validateEntity(Utilisateur entite)
        {
            if (entite == null)
            {
                throw new ArgumentNullException(nameof(entite));
            }

            var result = _context.Utilisateurs.FirstOrDefault(p =>( p.Id != entite.Id && p.Email == entite.Email));
            if(result != null)
            {
                throw new ArgumentException("Email invalid");
            }
        }

        public Utilisateur Login(string email, string password)
        {
            var result = _context.Utilisateurs.FirstOrDefault(p => (p.Email == email && p.Password == password));

            return result;
        }
    }
}

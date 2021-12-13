using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Repository
{
    public class MarqueRepository: IMarqueRepository
    {
        private readonly AppParcAutomobileDbContext _context;

        public MarqueRepository(AppParcAutomobileDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Marque> GetAll()
        {
            return _context.Marques.ToList();
        }
    }
}

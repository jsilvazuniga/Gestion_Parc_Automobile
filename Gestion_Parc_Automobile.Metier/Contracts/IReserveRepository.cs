using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Contracts
{
    public interface IReserveRepository
    {
        bool SaveChanges();

        bool CreateReserve(Reservation reserve);
        IEnumerable<Reservation> GetAll();
        IEnumerable<Reservation> GetAllByUtilisateur(int idUtilisateur);
    }
}

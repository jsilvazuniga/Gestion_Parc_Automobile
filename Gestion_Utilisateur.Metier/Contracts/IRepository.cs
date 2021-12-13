using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Utilisateur.Metier.Contracts
{
    public interface IRepository<T> where T : class
    {
        bool SaveChanges();

        IEnumerable<T> GetAll();

        T GetId(int id);

        T Create(T entite);

        T Update(T entite);
    }
}

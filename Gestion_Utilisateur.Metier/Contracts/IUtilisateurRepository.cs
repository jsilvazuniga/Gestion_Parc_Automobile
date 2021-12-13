using Gestion_Utilisateur.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Utilisateur.Metier.Contracts
{
    public interface IUtilisateurRepository : IRepository<Utilisateur>
    {
        Utilisateur Login(string email, string password);
    }
}

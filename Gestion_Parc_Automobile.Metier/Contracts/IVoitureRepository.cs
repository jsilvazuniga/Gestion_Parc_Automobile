using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.Metier.Contracts
{
    public interface IVoitureRepository : IRepository<Voiture>
    {
        void SupprimerVoiture(int idVoiture);

        void ChangerKilometrage(int idVoiture, int kilometrage);

    }
}

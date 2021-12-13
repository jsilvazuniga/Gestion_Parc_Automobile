using Gestion_Utilisateur.Metier.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gestion_Utilisateur.Metier
{
    public class AppGestionUtilisateurDbContext : DbContext
    {
        public AppGestionUtilisateurDbContext(DbContextOptions<AppGestionUtilisateurDbContext> opt) : base(opt)
        {

        }

        public DbSet<Utilisateur> Utilisateurs { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Dto
{
    public class UtilisateurLoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}


using AutoMapper;
using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Models;
using Gestion_Parc_Automobile.WebAPI.Config;
using Gestion_Parc_Automobile.WebAPI.Dto;
using Gestion_Utilisateur.Metier.Contracts;
using Gestion_Utilisateur.Metier.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class UtilisateurController : ControllerBase
    {
        private readonly IUtilisateurRepository _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UtilisateurController(IUtilisateurRepository repository, IMapper mapper, IConfiguration configuration)
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<UtilisateurResponseDto>> GetUtilisateurs()
        {

            Console.WriteLine("--> Getting utilisateur...");

            var items = _repository.GetAll().ToList();

            var result = _mapper.Map<IEnumerable<UtilisateurResponseDto>>(items);

            return Ok(result);

        }

        [HttpPost]
        [Route("LoginUtilisateur")]
        public ActionResult<TokenResponse> Login([FromBody] UtilisateurLoginRequestDto utilisateurLoginRequestDto)
        {
            var entity = _repository.Login(utilisateurLoginRequestDto.Email, utilisateurLoginRequestDto.Password);

            if (entity == null)
            {
                throw new UnauthorizedAccessException();
            }

            // var result = _mapper.Map<Utilisateur, UtilisateurResponseDto>(entity);
           var token = AuthenticationConfig.GenerateJSONWebToken(entity, _configuration);

            return Ok(token);
        }

        [HttpPost]
        [Route("ObtenirUtilisateurIdentity")]
        [Authorize]
        public ActionResult<UtilisateurResponseDto> ObtenirUtilisateurIdentity()
        {
            string idUtilisateur = "0";
            if (User.Identity.IsAuthenticated)
            {
                idUtilisateur =  (((System.Security.Claims.ClaimsIdentity)User.Identity).Claims.Where(c => c.Type.Contains("ID"))).Select(c => c.Value).ToList().FirstOrDefault();
            }
            else
            {
                throw new UnauthorizedAccessException();
            }

            var entity = _repository.GetId(Convert.ToInt32(idUtilisateur));

            var result = _mapper.Map<UtilisateurResponseDto>(entity);

            return Ok(result);
        }


        [HttpPost]
        [Route("CreateUtilisateur")]
        public ActionResult<UtilisateurResponseDto> CreateUtilisateur([FromBody] UtilisateurRequestDto utilisateurRequestDto)
        {

            var entity = _mapper.Map<UtilisateurRequestDto, Utilisateur>(utilisateurRequestDto);

            var entityCreated = _repository.Create(entity);

            _repository.SaveChanges();

            var result = _mapper.Map<UtilisateurResponseDto>(entityCreated);

            return Ok(result);
        }
    }
}

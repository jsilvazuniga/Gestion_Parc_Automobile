using AutoMapper;
using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Models;
using Gestion_Parc_Automobile.WebAPI.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ModeleController : ControllerBase
    {
        private readonly IModeleRepository _repository;
        private readonly IMapper _mapper;

        public ModeleController(IModeleRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ModeleResponseDto>> GetColeurs()
        {

            Console.WriteLine("--> Getting modele...");

            var items = _repository.GetAll();

            var result = _mapper.Map<IEnumerable<ModeleResponseDto>>(items);

            return Ok(result);

        }
    }
}

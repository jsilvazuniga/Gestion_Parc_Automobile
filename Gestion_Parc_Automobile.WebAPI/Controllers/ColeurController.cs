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
    public class ColeurController : ControllerBase
    {
        private readonly IColeurRepository _repository;
        private readonly IMapper _mapper;

        public ColeurController(IColeurRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<ColeurResponseDto>> GetColeurs()
        {

            Console.WriteLine("--> Getting coleurs...");

            var items = _repository.GetAll();

            var result = _mapper.Map<IEnumerable<ColeurResponseDto>>(items);

            return Ok(result);

        }
    }
}

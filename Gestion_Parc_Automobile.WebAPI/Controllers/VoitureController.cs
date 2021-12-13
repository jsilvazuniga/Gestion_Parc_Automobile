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
    public class VoitureController : ControllerBase
    {
        private readonly IVoitureRepository _repository;
        private readonly IMapper _mapper;

        public VoitureController(IVoitureRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<VoitureResponseDto>> GetVoitures()
        {

            Console.WriteLine("--> Getting voitures...");

            var items = _repository.GetAll().ToList();

            var result = _mapper.Map<IEnumerable<VoitureResponseDto>>(items);

            return Ok(result);

        }

        [HttpGet]
        [Route("GetVoiture/{idVoiture}")]
        public ActionResult<VoitureResponseDto> GetVoiture(int idVoiture)
        {

            Console.WriteLine("--> Getting voiture...");

            var items = _repository.GetId(idVoiture);

            var result = _mapper.Map<VoitureResponseDto>(items);

            return Ok(result);

        }

        [HttpPost]
        [Route("AjouterVoiture")]
        public ActionResult<VoitureResponseDto> AjouterVoiture([FromBody] VoitureRequestDto voitureRequestDto)
        {
            var entity = _mapper.Map<VoitureRequestDto, Voiture>(voitureRequestDto);

            if(entity.Id > 0)
            {
                entity = _repository.Update(entity);
            }
            else
            {
                entity = _repository.Create(entity);
            }
          

            _repository.SaveChanges();

            entity = _repository.GetId(entity.Id);

            var result = _mapper.Map<Voiture, VoitureResponseDto>(entity);
                        

            return Ok(result);
        }

        //[HttpDelete]
        [HttpPost]
        [Route("SupprimerVoiture/{idVoiture}")]
        public ActionResult<bool> SupprimerVoiture(int idVoiture)
        {
            _repository.SupprimerVoiture(idVoiture);

            _repository.SaveChanges();

            return Ok(true);
        }

        [HttpPost]
        [Route("ChangeKilometrage/{idVoiture}/{kilometrage}")]
        public ActionResult<bool> ChangerKilometrage(int idVoiture, int kilometrage)
        {
            _repository.ChangerKilometrage(idVoiture, kilometrage);

            _repository.SaveChanges();

            return Ok(true);
        }
    }
}

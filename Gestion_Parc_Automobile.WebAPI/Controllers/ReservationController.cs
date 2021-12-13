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
    public class ReservationController : ControllerBase
    {
        private readonly IReserveRepository _repository;
        private readonly IMapper _mapper;

        public ReservationController(IReserveRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllReservations")]
        public ActionResult<IEnumerable<ReservationResponseDto>> GetAllReservations()
        {

            Console.WriteLine("--> Getting reservations...");

            var items = _repository.GetAll().ToList();

            var result = _mapper.Map<IEnumerable<ReservationResponseDto>>(items);

            return Ok(result);

        }

        [HttpGet]
        [Route("GetMyReservations")]
        public ActionResult<IEnumerable<ReservationResponseDto>> GetReservation()
        {

            Console.WriteLine("--> Getting reservations...");
            string idUtilisateur = "0";
            if (User.Identity.IsAuthenticated)
            {
                idUtilisateur = (((System.Security.Claims.ClaimsIdentity)User.Identity).Claims.Where(c => c.Type.Contains("ID"))).Select(c => c.Value).ToList().FirstOrDefault();
            }

            var items = _repository.GetAllByUtilisateur(Convert.ToInt32(idUtilisateur));

            var result = _mapper.Map<IEnumerable<ReservationResponseDto>>(items);

            return Ok(result);

        }

        [HttpPost]
        [Route("CreateReserve")]
        public ActionResult<ReservationResponseDto> CreateReserve([FromBody] ReservationRequestDto reservationRequestDto)
        {
            string idUtilisateur = "0";
            Reservation entity = _mapper.Map<ReservationRequestDto, Reservation>(reservationRequestDto);

            if (User.Identity.IsAuthenticated)
            {
                idUtilisateur = (((System.Security.Claims.ClaimsIdentity)User.Identity).Claims.Where(c => c.Type.Contains("ID"))).Select(c => c.Value).ToList().FirstOrDefault();
            }
            entity.IdUtilisateur = Convert.ToInt32(idUtilisateur);

            _repository.CreateReserve(entity);

            _repository.SaveChanges();

            var result = _mapper.Map<Reservation, ReservationResponseDto>(entity);
                        

            return Ok(result);
        }
    
    }
}

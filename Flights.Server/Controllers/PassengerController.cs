using Flights.Server.Data;
using Flights.Server.Domain.Entities;
using Flights.Server.Dtos;
using Flights.Server.ReadModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Flights.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly Entities _entities; 
        public PassengerController(Entities Entities)
        {
            this._entities = Entities;
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassengerDto dto)
        {
           _entities.Passengers.Add(new Passenger(
                dto.Email,
                dto.Firstname
                ,dto.Lastname
                ,dto.Gender));
            _entities.SaveChanges();
            return CreatedAtAction ("Find",new {email=dto.Email},new { email = dto.Email });
        }

        [HttpGet("{email}",Name ="Find")]
       
        public ActionResult<PassengerRm> Find(string email)
        {
            var passenger=_entities.Passengers.FirstOrDefault(x => x.Email == email);

            if (passenger == null)
             return NotFound();
            var rm = new PassengerRm
                (
                passenger.Email,
                passenger.Firstname,
                passenger.Lastname,
                passenger.Gender
                );
            return Ok(rm);
        }

    }
}

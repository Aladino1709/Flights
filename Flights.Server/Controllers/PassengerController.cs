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
        static private IList<NewPassengerDto> Passengers=new List<NewPassengerDto>();
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassengerDto dto)
        {
            Passengers.Add(dto);
            return CreatedAtAction ("Find",new {email=dto.Email},new { email = dto.Email });
        }

        [HttpGet("{email}",Name ="Find")]
       
        public ActionResult<PassengerRm> Find(string email)
        {
            var passenger=Passengers.FirstOrDefault(x => x.Email == email);

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

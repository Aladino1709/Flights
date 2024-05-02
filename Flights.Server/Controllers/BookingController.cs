using Flights.Server.Data;
using Flights.Server.Domain.Error;
using Flights.Server.Dtos;
using Flights.Server.ReadModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Flights.Server.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly Entities _entities;
        public BookingController(Entities entities)
        {
            _entities = entities;
        }
        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<BookingRm>), 200)]
        public ActionResult<IEnumerable<BookingRm>> List(string email)
        {
            var bookings = _entities.Flights.ToArray()
                .SelectMany(f => f.Bookings
                .Where(b => b.PassengerEmail == email)
                .Select(b => new BookingRm(
                    f.Id,
                    f.Airline,
                    f.Price.ToString(),
        new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
        new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
        b.Numberofseats,
        b.PassengerEmail

        )));

            return Ok(bookings);

        }
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Cancel(BookDto dto)
        {
            var flight=_entities.Flights.Find(dto.FlightId);    
            var error= flight?.CancelBooking(dto.PassengerEmail,dto.Numberofseats);
            if (error == null) 
            {
                _entities.SaveChanges();
                return NoContent();
            }
            if (error is NotFoundError) 
            {
                return NotFound();
            }
            throw new Exception($" An error of type {error.GetType().Name} occured while canceling the booking made by{dto.PassengerEmail}.");
        }
    }
}

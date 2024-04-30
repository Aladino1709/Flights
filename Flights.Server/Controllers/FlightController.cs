using Flights.Server.Data;
using Flights.Server.Domain.Entities;
using Flights.Server.Domain.Error;
using Flights.Server.Dtos;
using Flights.Server.ReadModels;

using Microsoft.AspNetCore.Mvc;

namespace Flights.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlightController : ControllerBase
    {
        
        private readonly Entities _entities;

       



        
        public FlightController(Entities Entities)
        {
            this._entities = Entities;
        }

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        [HttpGet]
        public IEnumerable<FlightRm> Search()
        {

            var readModel = _entities.Flights.Select(flight => new FlightRm(

                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                ));
            return (readModel);    
        }
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(FlightRm), 200)]

        [HttpGet("{id}")]
        public ActionResult<FlightRm> Find(Guid id)
        {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);
            if (flight == null)
                return NotFound();
            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                );
            return Ok(readModel);

        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(FlightRm), 200)]
        public IActionResult Book(Bookdto dto)
        {

            System.Diagnostics.Debug.WriteLine($"booking a new flight to {dto.PassengerEmail}");
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);
            if (flight == null) 
                return NotFound();
            var error = flight.MakeBooking(dto.PassengerEmail, dto.Numberofseats);
               if(error is OverBookError)
                return Conflict(new { message = " requested number of seats exceeds the flight's remaining number of seats" });
            return CreatedAtAction("Find", new { id = dto.FlightId }, new { id = dto.FlightId });
            
            
           
        }
    }
}
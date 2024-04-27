using Flights.Server.Controllers;
using Flights.Server.Domain.Entities;

namespace Flights.Server.Domain.Entities

{
    public record Flight(
        Guid Id,
        string Airline,
        string Price,
        TimePlace Departure,
        TimePlace Arrival,
        int RemainingNumberOfSeats

        )
    {

        public IList<Booking> bookings = new List<Booking>();

    }
}
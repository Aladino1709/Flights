using Flights.Server.Domain.Error;
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
        public int RemainingNumberOfSeats { get; set; } = RemainingNumberOfSeats;
        public object? MakeBooking(string passengerEmail, byte numberOfSeats)
        {
            var flight = this;
            if (flight.RemainingNumberOfSeats < numberOfSeats)
                return new OverBookError();

            flight.bookings.Add(new Booking(
                    passengerEmail,
                    numberOfSeats));
            flight.RemainingNumberOfSeats -= numberOfSeats;
            return null;
            

        }

    }
}
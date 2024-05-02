using Flights.Server.Domain.Error;
using Flights.Server.Dtos;
using Microsoft.AspNetCore.Mvc;
namespace Flights.Server.Domain.Entities
{
    public class Flight
    {
        public Guid Id { get; set; }
        public string Airline { get; set; }

        public string Price { get; set; }
        public TimePlace Departure { get; set; }
        public TimePlace Arrival { get; set; }
        public int RemainingNumberOfSeats { get; set; }

        public Flight(Guid id, string airline, string price, TimePlace departure, TimePlace arrival, int remainingNumberOfSeats)
        {
            Id = id;
            Airline = airline;
            Price = price;
            Departure = departure;
            Arrival = arrival;
            RemainingNumberOfSeats = remainingNumberOfSeats;
           
        }
        public Flight()
        {
                
        }

        public IList<Booking> Bookings = new List<Booking>();

        public object? MakeBooking(string passengerEmail, byte numberOfSeats)
        {
            var flight = this;
            if (flight.RemainingNumberOfSeats < numberOfSeats)
                return new OverBookError();

            flight.Bookings.Add(new Booking(
                    passengerEmail,
                    numberOfSeats));
            flight.RemainingNumberOfSeats -= numberOfSeats;
            return null;


        }
        public Object? CancelBooking(string passengerEmail,int numberOfSeats) 
        { 

            var booking=Bookings.FirstOrDefault(b=>b.PassengerEmail.ToLower() == passengerEmail.ToLower()&&
            b.Numberofseats==numberOfSeats);
            if (booking == null)
                return  new NotFoundError();
            Bookings.Remove(booking);
            RemainingNumberOfSeats += booking.Numberofseats;
            return null; 
        }
        

    }
}

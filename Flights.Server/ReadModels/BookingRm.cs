namespace Flights.Server.ReadModels
{
    public record BookingRm
   (
        Guid FlighId,
        string Airline,
        string Price,
        TimePlaceRm Arrival,
        TimePlaceRm Departure,
        int NumberOfBookedSeats,
        string PassengerEmail
   );
}

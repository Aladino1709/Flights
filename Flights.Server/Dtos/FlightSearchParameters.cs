using System.ComponentModel;

namespace Flights.Server.Dtos
{
    public record FlightSearchParameters
    (
    [DefaultValue("05/05/2024 7:30 AM")]
     DateTime?FromDate,
    [DefaultValue("06/05/2024 7:30 AM")]
     DateTime? ToDate,
    [DefaultValue("Tunis")]
     string? From,
    [DefaultValue("Paris")]
     string? Destination,
    [DefaultValue(1)]
     int? NumberOfPassengers
    );
    
}

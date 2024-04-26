using System.ComponentModel.DataAnnotations ;
namespace Flights.Server.Dtos
{
    public record Bookdto
    (
        [Required]Guid FlightId, 
        [Required][EmailAddress][MinLength(3)]string PassengerEmail,
        [Required][Range(1,254)]byte Numberofseats
        );
    
}

using System.ComponentModel.DataAnnotations;

namespace Flights.Server.Dtos
{
    public record NewPassengerDto
   (
       [Required][EmailAddress][MinLength(3)]string Email,
       [Required][MaxLength(50)] string Firstname,
       [Required][MaxLength(50)] string Lastname,
       [Required] bool Gender
       );
}

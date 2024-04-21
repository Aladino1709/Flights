namespace Flights.Server.Dtos
{
    public record NewPassengerDto
   (
       string Email,
       string Firstname,
       string Lastname,
       bool Gender
       );
}

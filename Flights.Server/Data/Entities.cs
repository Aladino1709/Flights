using Flights.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace Flights.Server.Data
{
    public class Entities: DbContext
    { 
      public DbSet<Passenger> Passengers =>Set<Passenger>();
       public DbSet<Flight> Flights =>Set<Flight>() ;
        public Entities(DbContextOptions options):base(options) 
        {
                
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Passenger>().HasKey(k=>k.Email);
           modelBuilder.Entity<Flight>().Property(f=>f.RemainingNumberOfSeats).IsConcurrencyToken();
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Departure);
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Arrival);
        }
    }
}

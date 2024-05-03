import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookDto, BookingRm } from '../api/models';
import { BookingService } from '../api/services';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
  ) { }
  bookings!: BookingRm[];
  ngOnInit(): void {
    
    this.bookingService.listBooking({ email: this.authService.currentUser!.email ?? '' })
      .subscribe(r => this.bookings = r, this.handelError)
  }
  handelError(err: any) {
    console.log(err);
    alert(err);

  }
  cancel(book: BookingRm) {
    const dto: BookDto ={

      flightId: book.flighId,
      numberofseats: book.numberOfBookedSeats,
      passengerEmail: book.passengerEmail

    }
    this.bookingService.cancelBooking({ body: dto })
      .subscribe(_ => this.bookings = this.bookings.filter(b => b.flighId != dto.flightId)
        , this.handelError)
  }
}

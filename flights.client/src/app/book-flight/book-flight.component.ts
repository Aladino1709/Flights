import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { FlightService } from '../api/services/flight.service';
import { Bookdto, FlightRm } from '../api/models';
import { AuthService } from '../auth/auth.service'
import { FormBuilder, Validators } from '@angular/forms'
@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router,
    private authSevice: AuthService,
    private fb: FormBuilder
  ) { }
  flightId: string = 'not loaded'
  flight: FlightRm = {}
  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(251)])]
  })
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(p => this.findFlight(p.get("flightId")))
    if (!this.authSevice.currentUser)
      this.router.navigate(["/register-passenger"])
  }
  private findFlight(flightId: string | null) {
    this.flightId = flightId ?? 'not passed';
    this.flightService.findFlight({ id: this.flightId })
      .subscribe(flight => this.flight = flight, this.handleError)
  }
  private handleError=(err: any)=> {
    if (err.status == 404) {
      this.router.navigate(['/'])
      alert('Flight not Found !')
    }

     
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

  book() {
    if (this.form.invalid)
      return;
    console.log("booking " + this.form.get('number')?.value + "passengers fo the flight " + this.flightId)
    const booking: Bookdto = {
      passengerEmail: this.authSevice.currentUser?.email,
      flightId: this.flight.id,
      numberofseats: this.form.get('number')!.value!
    }
    this.flightService.bookFlight({ body: booking })
      .subscribe(e => this.router.navigate(['/my-booking']), console.error)
  }
  get number() {
    return this.form.controls.number

  }
}

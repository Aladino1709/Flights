import { Component, OnInit } from '@angular/core';
import { FlightService } from '../api/services/flight.service';
import { FlightRm } from '../api/models/flight-rm';
import { FormBuilder } from "@angular/forms"
@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  constructor(
    private flightService: FlightService,
    private formBuilder: FormBuilder
  ) { }
  searchResult: FlightRm[] = []
  searchForm = this.formBuilder.group({
    from: [''],
    destination: [''],
    fromDate: [''],
    toDate: [''],
    numberOfPassengers:[1]

  })
  ngOnInit(): void {
    
  }
  search() {
    this.flightService.searchFlight({
      from: this.searchForm.value.from!,
      destination: this.searchForm.value.destination!,
      fromDate: this.searchForm.value.fromDate!,
      toDate: this.searchForm.value.toDate!,
      numberOfPassengers: this.searchForm.value.numberOfPassengers!
    })
      .subscribe(response => this.searchResult = response,
        this.handleError)
  }

  private handleError(err: any) {
    if (err.status == 404)
      alert('Flight not Found !')
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}


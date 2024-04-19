import { Component, OnInit } from '@angular/core';
import { FlightService } from '../api/services/flight.service';
import { FlightRm } from '../api/models/flight-rm';
@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  constructor(private flightService: FlightService) { }
  searchResult: FlightRm []=[]
  ngOnInit(): void {
    this.search();
  }
  search() {
    this.flightService.searchFlight(this.searchResult)
      .subscribe(response => this.searchResult = response,
        this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}


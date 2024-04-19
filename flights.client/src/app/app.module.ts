import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { RouterModule } from '@angular/router';
import { BookFlightComponent } from './book-flight/book-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    BookFlightComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, RouterModule.forRoot([{ path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search', component: SearchFlightsComponent },
      { path: 'book-flight/:flightId', component: BookFlightComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

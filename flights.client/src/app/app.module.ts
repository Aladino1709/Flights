import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { RouterModule } from '@angular/router';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    BookFlightComponent,
    RegisterPassengerComponent,
    MyBookingsComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search', component: SearchFlightsComponent },
      { path: 'book-flight/:flightId', component: BookFlightComponent, pathMatch: 'full', canActivate:  [AuthGuard] },
      { path: 'register-passenger', component: RegisterPassengerComponent },
      { path: 'my-booking', component: MyBookingsComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, RouterModule.forRoot([{ path: 'search', component: SearchFlightsComponent, pathMatch: 'full' }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

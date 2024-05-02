/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from '../models/time-place-rm';
export interface BookingRm {
  airline?: string | null;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flighId?: string;
  numberOfBookedSeats?: number;
  passengerEmail?: string | null;
  price?: string | null;
}

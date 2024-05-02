/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookDto } from '../../models/book-dto';
import { FlightRm } from '../../models/flight-rm';

export interface BookFlight$Params {
      body?: BookDto
}

export function bookFlight(http: HttpClient, rootUrl: string, params?: BookFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightRm>> {
  const rb = new RequestBuilder(rootUrl, bookFlight.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FlightRm>;
    })
  );
}

bookFlight.PATH = '/Flight';

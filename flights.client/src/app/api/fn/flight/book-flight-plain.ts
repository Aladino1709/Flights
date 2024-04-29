/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Bookdto } from '../../models/bookdto';
import { FlightRm } from '../../models/flight-rm';

export interface BookFlight$Plain$Params {
      body?: Bookdto
}

export function bookFlight$Plain(http: HttpClient, rootUrl: string, params?: BookFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightRm>> {
  const rb = new RequestBuilder(rootUrl, bookFlight$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FlightRm>;
    })
  );
}

bookFlight$Plain.PATH = '/Flight';

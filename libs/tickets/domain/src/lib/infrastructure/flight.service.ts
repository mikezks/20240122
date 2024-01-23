import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Flight } from '../entities/flight';
import { DefaultFlightService } from './default-flight.service';

@Injectable({
  providedIn: 'root',
  useClass: DefaultFlightService,
})
export abstract class FlightService {
  flightCount$: Observable<number> = EMPTY;
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract findById(id: string): Observable<Flight>;
}

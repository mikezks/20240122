import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ticketActions } from './actions';
import { map, switchMap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';

@Injectable()
export class TicketEffects {
  private flightService = inject(FlightService);
  private actions$ = inject(Actions);

  loadFlights = createEffect(
    /**
     * Stream 1: Dispatched Actions
     *  - Trigger
     *  - State Provider: From, To
     */
    () => this.actions$.pipe(
      // Filtering
      ofType(ticketActions.flightsLoad),
      /**
       * Stream 2: Load Method HTTP Backend API Call
       *  - State Provider: Flights
       */
      // Access additional State
      // withLatestFrom() or
      // concatLatestFrom()
      switchMap(action => this.flightService.find(
        action.from,
        action.to
      )),
      // Transformation: Flights to Action
      map(flights => ticketActions.flightsLoaded({ flights }))
    )
  );
}

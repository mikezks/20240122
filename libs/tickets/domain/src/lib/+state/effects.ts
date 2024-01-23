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
    () => this.actions$.pipe(
      ofType(ticketActions.flightsLoad),
      switchMap(action => this.flightService.find(
        action.from,
        action.to
      )),
      map(flights => ticketActions.flightsLoaded({ flights }))
    )
  );
}

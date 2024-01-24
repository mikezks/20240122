import { Routes } from '@angular/router';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';
import { provideState } from '@ngrx/store';
import { ticketFeature, TicketEffects, provideRouterFeature } from '@flight-demo/tickets/domain';
import { provideEffects } from '@ngrx/effects';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects(TicketEffects),
      provideRouterFeature()
    ],
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent,
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
      },
      {
        path: 'flight-typeahead',
        component: FlightTypeaheadComponent,
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent,
      },
    ],
  },
];

export default FLIGHT_BOOKING_ROUTES;

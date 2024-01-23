import { createActionGroup, props } from "@ngrx/store";
import { Flight } from "../entities/flight";

export const ticketActions = createActionGroup({
  source: 'ticket',
  events: {
    'flights load': props<{ from: string, to: string }>(),
    'flights loaded': props<{ flights: Flight[] }>()
  }
});

/* ticketActions.flightsLoaded({
  flights: []
});

{
  type: '[ticket] flights loaded',
  flights: []
} */

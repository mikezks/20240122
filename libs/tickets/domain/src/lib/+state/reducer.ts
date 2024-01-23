import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ticketActions } from "./actions";
import { Flight } from "../entities/flight";


const flightEntities = {
  entities: {
    3: {
      id: 3,
      from: 'Hamburg',
      to: 'Graz',
      date: '',
      delayed: true
    },
    5: {
      id: 5,
      from: 'Hamburg',
      to: 'Graz',
      date: '',
      delayed: true
    },
    4: {
      id: 4,
      from: 'Hamburg',
      to: 'Graz',
      date: '',
      delayed: true
    }
  },
  ids: [5, 3, 4]
};

flightEntities.entities[5];

export interface TicketState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
  hide: number[];
}

export const initialTicketState: TicketState = {
  flights: [],
  basket: {},
  tickets: {},
  hide: [5]
};

export const ticketFeature = createFeature({
  name: 'ticket',
  reducer: createReducer(
    initialTicketState,

    on(ticketActions.flightsLoaded, (state, action) => ({
      ...state,
      flights: action.flights
    }))
  ),
  extraSelectors: ({ selectFlights, selectHide}) => ({
    selectFilteredFlights: createSelector(
      // Selectors
      selectFlights,
      selectHide,
      // Projector
      (flights, hide) => flights.filter(
        flight => !hide.includes(flight.id)
      )
    )
  })
});

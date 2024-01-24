import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { Flight, ticketActions, ticketFeature } from '@flight-demo/tickets/domain';
import { Store } from '@ngrx/store';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  private store = inject(Store);

  from = signal('London');
  to = signal('New York');
  flights = this.store.selectSignal(ticketFeature.selectFilteredFlights);
  selectedFlight: Flight | undefined;

  lazyFrom$ = toObservable(this.from).pipe(
    debounceTime(300)
  );
  lazyFrom = toSignal(this.lazyFrom$, {
    initialValue: this.from()
  });

  flightRoute = computed(
    () => 'From ' + this.lazyFrom() + ' to ' + this.to() + '.'
  );

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  constructor() {
    effect(
      () => console.log(this.from(), untracked(() => this.to()))
    );

    /* this.from.set('Paris');
    this.from.set('Zürich');
    this.from.set('Rom');
    this.from.set('Barcelona'); */
  }

  search(): void {
    if (!this.from() || !this.to()) {
      return;
    }

    // Reset properties
    this.selectedFlight = undefined;

    this.store.dispatch(
      ticketActions.flightsLoad({
        from: this.from(),
        to: this.to()
      })
    );
  }

  select(f: Flight): void {
    this.selectedFlight = { ...f };
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-flight-typeahead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-typeahead.component.html',
  styleUrl: './flight-typeahead.component.scss',
})
export class FlightTypeaheadComponent {
  private flightService = inject(FlightService);

  protected control = new FormControl('', { nonNullable: true });
  protected flights$ = this.initTypeaheadStream();
  protected loading = false;

  private initTypeaheadStream(): Observable<Flight[]> {
    /**
     * Stream 1: From Control User Input
     *  - Trigger
     *  - State Provider: City
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      // Side-Effect: Loading State
      tap(() => this.loading = true),
      /**
       * Stream 2: Load Method HTTP Backend API Call
       *  - State Provider: Flights
       */
      switchMap(city => this.load(city).pipe(
        catchError(() => of([]))
      )),
      // Side-Effect: Loading State
      tap(() => this.loading = false)
    );
  }

  private load(city: string): Observable<Flight[]> {
    return this.flightService.find(city, '');
  }
}

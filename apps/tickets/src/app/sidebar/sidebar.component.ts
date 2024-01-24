import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Injector, inject, runInInjectionContext } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlightService } from '@flight-demo/tickets/domain';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {
  flightCount$ = inject(FlightService).flightCount$;
  injector = inject(Injector);

  search() {
    runInInjectionContext(this.injector, () => {
      injectFlightCount()
    });
  }
}

export function injectFlightCount(): Observable<number> {
  return inject(FlightService).flightCount$;
}

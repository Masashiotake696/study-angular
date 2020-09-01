import { Component } from '@angular/core';

@Component({
  selector: 'app-votetaker',
  template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{ agreed }}, Disagree: {{ disagreed }}</h3>
    <app-voter *ngFor="let voter of voters" [name]="voter" (voted)="onVoted($event)"></app-voter>
  `
})
export class VotetakerComponent {
  agreed = 0;
  disagreed = 0;
  voters: string[] = ['Narco', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean): void {
    agreed ? this.agreed++ : this.disagreed++;
  }
}

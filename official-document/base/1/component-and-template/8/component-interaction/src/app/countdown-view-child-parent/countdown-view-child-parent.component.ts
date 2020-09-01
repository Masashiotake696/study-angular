import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-countdown-view-child-parent',
  template: `
    <h3>Countdown to Liftoff (via ViewChild)</h3>
    <button (click)="start()">Start</button>
    <button (click)="stop()">Stop</button>
    <div class="seconds">{{ seconds() }}</div>
    <app-countdown-timer #timer></app-countdown-timer>
  `,
  styles: [`
    .seconds {
      background-color: black;
      color: red;
      font-size: 3em;
      margin: 0.3em 0;
      text-align: center;
      width: 1.5em;
    }
  `]
})
export class CountdownViewChildParentComponent implements AfterViewInit {
  @ViewChild(CountdownTimerComponent) private timerComponent: CountdownTimerComponent;

  ngAfterViewInit(): void {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => (this.seconds = () => this.timerComponent.seconds), 0);
  }

  seconds(): number {
    return 0;
  }

  start(): void {
    this.timerComponent.start();
  }

  stop(): void {
    this.timerComponent.stop();
  }
}

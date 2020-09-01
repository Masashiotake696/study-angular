import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnChanges {
  @Input() counter: number;
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Empty the changeLog whenever counter goes to zero
    if (this.counter === 0) {
      this.changeLog = []; // OnDestroy
    }

    // A change to 'counter' is the only change we care about
    const change = changes.counter;
    const currentValue = change.currentValue;
    const previousValue = JSON.stringify(change.previousValue);
    this.changeLog.push(`counter: currentValue = ${currentValue}, previousValue = ${previousValue}`); // OnInit
  }
}

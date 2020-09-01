import { Component } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-counter-parent',
  templateUrl: './counter-parent.component.html',
  styleUrls: ['./counter-parent.component.css'],
  providers: [
    LoggerService,
  ]
})
export class CounterParentComponent {
  value: number;
  spyLog: string[] = [];

  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this.spyLog = logger.logs;
    this.reset();
  }


  updateCounter(): void {
    this.value++;
    this.logger.tick();
  }

  reset(): void {
    this.logger.log('-- reset --');
    this.value = 0;
    this.logger.tick();
  }
}

import { Component } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-after-content-parent',
  templateUrl: './after-content-parent.component.html',
  styleUrls: ['./after-content-parent.component.css'],
  providers: [
    LoggerService,
  ]
})
export class AfterContentParentComponent {
  show = true;

  constructor(public logger: LoggerService) {}

  reset(): void {
    this.logger.clear();
    this.show = false;
    this.logger.tick_then(() => this.show = true);
  }

}

import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-child-view',
  template: `
    <input [(ngModel)]="hero" />
  `
})
export class ChildViewComponent implements AfterViewInit, AfterViewChecked {
  hero = 'Magneta';

  constructor(private logger: LoggerService) {
    this.logger.log('Child constructor');
  }

  ngAfterViewInit(): void {
    this.logger.log(`Child AfterViewInit: ${this.hero}`);
  }

  ngAfterViewChecked(): void {
    this.logger.log(`Child AfterViewChecked: ${this.hero}`);
  }
}

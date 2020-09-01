import { Directive, OnInit, OnDestroy } from '@angular/core';

import { LoggerService } from './logger.service';

let nextId = 1;

@Directive({
  selector: '[appSpy]'
})
export class SpyDirective implements OnInit, OnDestroy {

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.logIt('OnInit');
  }

  ngOnDestroy(): void {
    this.logIt('OnDestroy');
  }

  private logIt(message: string): void {
    this.logger.log(`Spy #${nextId++} ${message}`);
  }
}

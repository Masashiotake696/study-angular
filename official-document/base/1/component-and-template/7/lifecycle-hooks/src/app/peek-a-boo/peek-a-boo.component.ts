// tslint:disable: no-conflicting-lifecycle
import {
  Component,
  OnInit,
  Directive,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  Input
} from '@angular/core';

import { LoggerService } from '../logger.service';

let nextId = 1;

@Directive()
export class PeekABooDirective implements OnInit {
  constructor(private logger: LoggerService) {}

  // implement OnInit's `ngOnInit` method
  ngOnInit(): void {
    this.logIt('OnInit');
  }

  logIt(message: string): void {
    this.logger.log(`#${nextId++} ${message}`);
  }
}

@Component({
  selector: 'app-peek-a-boo',
  template: `
    <p>Now you see my hero, {{ name }}</p>
  `,
  styles: [
    `p {
      background: LightYellow;
      padding: 8px;
    }`
  ]
})
export class PeekABooComponent extends PeekABooDirective
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() name: string;

  private verb = 'initialized';

  constructor(logger: LoggerService) {
    super(logger);

    // constructor内ではInput要素は参照できない
    const is = this.name ? 'is' : 'is not';
    this.logIt(`constructor: name ${is} known at construction`);
  }

  // only called for/if there is an @input variable set by parent.
  ngOnChanges(changes: SimpleChanges): void {
    const changesMessages: string[] = [];
    for (const propName in changes) {
      if (propName === 'name') {
        const name = changes.name.currentValue;
        changesMessages.push(`name ${this.verb} to "${name}"`);
      } else {
        changesMessages.push(`${propName} ${this.verb}`);
      }
    }
    this.logIt(`OnChanges: ${changesMessages.join('; ')}`);
    this.verb = 'changed'; // next time it will be a change
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhare on the page
  ngDoCheck(): void {
    this.logIt('DoCheck');
  }

  ngAfterContentInit(): void {
    this.logIt('AfterContentInit');
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhare on the page
  ngAfterContentChecked(): void {
    this.logIt('AfterContentChecked');
  }

  ngAfterViewInit(): void {
    this.logIt('AfterViewInit');
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhare on the page
  ngAfterViewChecked(): void {
    this.logIt('AfterViewChecked');
  }

  ngOnDestroy(): void {
    this.logIt('OnDestroy');
  }

}

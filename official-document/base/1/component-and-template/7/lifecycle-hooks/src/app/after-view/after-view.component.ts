import { Component, AfterViewInit, AfterViewChecked, ViewChild } from '@angular/core';

import { ChildViewComponent } from '../child-view/child-view.component';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-after-view',
  templateUrl: './after-view.component.html',
  styleUrls: ['./after-view.component.css']
})
export class AfterViewComponent implements AfterViewInit, AfterViewChecked {
  comment = '';
  private previousHero = '';

  @ViewChild(ChildViewComponent) viewChild: ChildViewComponent;

  constructor(private logger: LoggerService) {
    this.logIt('constructor');
  }

  ngAfterViewInit(): void {
    this.logIt('AfterViewInit');
    this.doSomething();
  }

  ngAfterViewChecked(): void {
    if (this.previousHero === this.viewChild.hero) {
      this.logIt('AfterViewChecked (no change)');
    } else {
      this.previousHero = this.viewChild.hero;
      this.logIt('AfterViewChecked');
      this.doSomething();
    }
  }

  private doSomething(): void {
    const comment = this.viewChild.hero.length > 10 ? `That's a long name` : '';
    if (comment !== this.comment) {
      this.logger.tick_then(() => this.comment = comment);
    }
  }

  private logIt(method: string): void {
    const child = this.viewChild;
    const message = `${method}: ${child ? child.hero : 'no'} child view`;
    this.logger.log(message);
  }
}

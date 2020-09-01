import { Component, AfterContentInit, AfterContentChecked, ContentChild } from '@angular/core';

import { ChildComponent } from '../child/child.component';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-after-content',
  templateUrl: './after-content.component.html',
  styleUrls: ['./after-content.component.css']
})
export class AfterContentComponent implements AfterContentInit, AfterContentChecked {
  private previousHero = '';
  comment = '';

  @ContentChild(ChildComponent) contentChild: ChildComponent;

  constructor(private logger: LoggerService) {
    this.logIt('AfterContent constructor');
  }

  ngAfterContentInit(): void {
    this.logIt('AfterContentInit');
    this.doSomething();
  }

  ngAfterContentChecked(): void {
    if (this.previousHero === this.contentChild.hero) {
      this.logIt('AfterContentChecked (no change)');
    } else {
      this.previousHero = this.contentChild.hero;
      this.logIt('AfterContentChecked');
      this.doSomething();
    }
  }

  private doSomething(): void {
    this.comment = this.contentChild.hero.length > 10 ? `That's a long name` : '';
  }

  private logIt(method: string): void {
    const child = this.contentChild;
    const message = `${method}: ${child ? child.hero : 'no'} child content`;
    this.logger.log(message);
  }
}

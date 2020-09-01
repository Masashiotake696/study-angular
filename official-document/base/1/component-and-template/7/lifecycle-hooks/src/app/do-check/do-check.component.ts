import { Component, DoCheck, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-do-check',
  templateUrl: './do-check.component.html',
  styleUrls: ['./do-check.component.css']
})
export class DoCheckComponent implements DoCheck {
  @Input() hero: Hero;
  @Input() power: string;

  changeDetected = false;
  changeLog: string[] = [];
  oldHeroName = '';
  oldPower = '';
  oldLogLength = 0;
  noChangeCount = 0;

  ngDoCheck(): void {
    if (this.hero.name !== this.oldHeroName) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from ${this.oldHeroName}"`);
      this.oldHeroName = this.hero.name;
    }

    if (this.power !== this.oldPower) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
      this.oldPower = this.power;
    }

    if (this.changeDetected) {
      this.noChangeCount = 0;
    } else {
      // log that hook was called when there was no relevant change.
      this.noChangeCount++;
      const noChangeMessage = `DoCheck called ${this.noChangeCount}x when no change to hero or power`;
      if (this.noChangeCount === 1) {
        // add new "no change" message
        this.changeLog.push(noChangeMessage);
      } else {
        // update last "no change" message
        this.changeLog[this.changeLog.length - 1] = noChangeMessage;
      }
    }

    this.changeDetected = false;
  }

  reset(): void {
    this.changeDetected = true;
    this.changeLog = [];
  }
}

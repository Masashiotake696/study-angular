// tslint:disable:forin
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-on-changes',
  templateUrl: './on-changes.component.html',
  styleUrls: ['./on-changes.component.css']
})
export class OnChangesComponent implements OnChanges {
  @Input() hero: Hero;
  @Input() power: string;

  changeLog: string[] = [];

  // Inputでhero.nameの変更は検知しない（heroのオブジェクト参照を監視しているため）
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const change = changes[propName];
      const currentValue = JSON.stringify(change.currentValue);
      const previousValue = JSON.stringify(change.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${currentValue}, previousValue = ${previousValue}`);
    }
  }

  reset(): void {
    this.changeLog = [];
  }
}

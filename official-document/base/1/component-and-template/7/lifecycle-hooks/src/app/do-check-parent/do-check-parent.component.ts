import { Component, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { DoCheckComponent } from '../do-check/do-check.component';

@Component({
  selector: 'app-do-check-parent',
  templateUrl: './do-check-parent.component.html',
  styleUrls: ['./do-check-parent.component.css']
})
export class DoCheckParentComponent {
  hero: Hero;
  power: string;
  title = 'DoCheck';

  @ViewChild(DoCheckComponent) childView: DoCheckComponent;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.hero = new Hero('Windstorm');
    this.power = 'sing';
    if (this.childView) {
      this.childView.reset();
    }
  }
}

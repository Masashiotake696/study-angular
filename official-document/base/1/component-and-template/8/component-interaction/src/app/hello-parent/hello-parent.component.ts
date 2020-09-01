import { Component } from '@angular/core';

import { Hero, HEROES } from '../hero';

@Component({
  selector: 'app-hello-parent',
  template: `
    <h2>{{ master }} controls {{ heroes.length }} heroes</h2>
    <app-hello-child *ngFor="let hero of heroes" [hero]="hero" [master]="master"></app-hello-child>
  `
})
export class HelloParentComponent {
  heroes: Hero[] = HEROES;
  master = 'Master';
}

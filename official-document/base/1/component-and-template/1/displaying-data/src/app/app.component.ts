import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <h2>My favorite hero is: {{ myHero }}</h2>
    <p>Heroes:</p>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero.name }}
      </li>
    </ul>
    <p *ngIf="heroes.length > 3">There are many heroes!</p>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes: Hero[] = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado'),
  ];
  myHero: Hero = this.heroes[0];

  constructor() {}
}

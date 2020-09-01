import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hero: Hero = {
     id: 1,
     name: 'hero1',
     emotion: 'happy',
  };
  heroes: Hero[] = [
    { id: 1, name: 'hero1', emotion: 'happy' },
    { id: 2, name: 'hero2', emotion: 'sad' },
    { id: 3, name: 'hero3', emotion: 'confused' },
    { id: 4, name: 'hero4', emotion: 'soso' },
    { id: 5, name: 'hero5', emotion: 'good' },
  ];
  heroSelected: Hero;
  showSad = true;
  condition = false;

  trackById(index: number, hero: Hero): number {
    return hero.id;
  }
}

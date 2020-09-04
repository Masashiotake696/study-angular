import { Injectable } from '@angular/core';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [
    new Hero(1, 'RubberMan', 'Hero of many talents', '123-456-7899'),
    new Hero(2, 'Magma', 'Hero of all trades', '555-555-5555'),
    new Hero(3, 'Dr Nice', 'The name says it all', '111-222-3333')
  ];

  getHeroById(id: number): Hero {
    return this.heroes.find(hero => hero.id === id);
  }

  getAllHeroes(): Hero[] {
    return this.heroes;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from './hero';

@Pipe({
  name: 'flyingHeroes'
})
export class FlyingHeroesPipe implements PipeTransform {

  transform(heroes: Hero[]): Hero[] {
    return heroes.filter(hero => hero.canFly);
  }

}

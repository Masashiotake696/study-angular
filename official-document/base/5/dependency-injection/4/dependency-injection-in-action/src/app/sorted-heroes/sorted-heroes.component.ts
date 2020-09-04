import { Component } from '@angular/core';

import { HeroesBaseComponent } from '../heroes-base/heroes-base.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-sorted-heroes',
  templateUrl: './sorted-heroes.component.html',
  styleUrls: ['./sorted-heroes.component.css'],
})
export class SortedHeroesComponent extends HeroesBaseComponent {

  constructor(heroService: HeroService) {
    super(heroService);
  }

  protected afterGetHeroes(): void {
    this.heroes = this.heroes.sort((h1, h2) => {
      return h1.name < h2.name ? -1 : (h1.name > h2.name ? 1 : 0);
    });
  }
}

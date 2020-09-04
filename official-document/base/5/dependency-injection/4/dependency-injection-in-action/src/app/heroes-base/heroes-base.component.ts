import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes-base',
  templateUrl: './heroes-base.component.html',
  styleUrls: ['./heroes-base.component.css'],
  providers: [
    HeroService,
  ]
})
export class HeroesBaseComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes = this.heroService.getAllHeroes();
    this.afterGetHeroes();
  }

  protected afterGetHeroes(): void {}

}

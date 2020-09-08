import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [
    HeroesService,
  ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  editHero: Hero; // the hero currently being edited

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    this.editHero = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    const newHero: Hero = { name } as Hero;
    this.heroesService.addHero(newHero).subscribe(() => this.getHeroes());
  }

  deleteHero(hero: Hero): void {
    this.heroesService.deleteHero(hero.id).subscribe(() => this.getHeroes());
  }

  edit(hero: Hero): void {
    this.editHero = hero;
  }

  searchHero(searchTerm: string): void {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService.searchHeroes(searchTerm).subscribe(heroes => this.heroes = heroes);
    }
  }

  updateHero(): void {
    if (this.editHero) {
      this.heroesService.updateHero(this.editHero).subscribe(() => this.getHeroes());
      this.editHero = undefined;
    }
  }
}

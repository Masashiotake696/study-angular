import { Component, OnInit } from '@angular/core';

import { Hero, HEROES } from '../hero';

@Component({
  selector: 'app-flying-heroes',
  templateUrl: './flying-heroes.component.html',
  styleUrls: ['./flying-heroes.component.css']
})
export class FlyingHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  canFly = true;
  mutate = true;

  constructor() {
    this.reset();
  }

  ngOnInit(): void {
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    const hero: Hero = {
      id: this.heroes.length + 1,
      name,
      canFly: this.canFly,
    };
    if (this.mutate) {
      this.heroes.push(hero);
    } else {
      // pureなパイプでも変更を検出できるようにconcatメソッドを使用して新しいオブジェクト参照をheroes変数に格納する
      this.heroes = this.heroes.concat(hero);
    }
  }

  reset(): void {
    this.heroes = HEROES.slice();
  }
}

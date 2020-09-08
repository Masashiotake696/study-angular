import { Component } from '@angular/core';

import { HeroesBaseComponent } from '../heroes-base/heroes-base.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-sorted-heroes',
  templateUrl: './sorted-heroes.component.html',
  styleUrls: ['./sorted-heroes.component.css'],
  providers: [
    HeroService,
  ]
})
export class SortedHeroesComponent extends HeroesBaseComponent {

  constructor(heroService: HeroService) {
    super(heroService);
  }

  // ngOnInitでソートを使用とすると、ベースクラスのngOnInitよりも先に呼び出されてしまい、
  // ヒーローを取得する前に処理が行われるため、ベースクラスのafterGetHeroes()メソッドをオーバーライドすることで対応
  protected afterGetHeroes(): void {
    this.heroes = this.heroes.sort((h1, h2) => {
      return h1.name < h2.name ? -1 : (h1.name > h2.name ? 1 : 0);
    });
  }
}

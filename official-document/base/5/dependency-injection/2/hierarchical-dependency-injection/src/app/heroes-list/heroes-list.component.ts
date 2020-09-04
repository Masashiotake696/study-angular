import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroTaxReturn } from '../hero-tax-return';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent {
  heroes: Observable<Hero[]>;
  selectedTaxReturns: HeroTaxReturn[] = [];

  constructor(private heroesService: HeroesService) {
    this.heroes = heroesService.getHeroes();
  }

  // 選択されたヒーローのHeroTaxReturnをselectedTaxReturns配列に格納
  showTaxReturn(hero: Hero): void {
    this.heroesService.getTaxReturn(hero).subscribe(htr => {
      if (!this.selectedTaxReturns.find(tr => tr.id === htr.id)) {
        this.selectedTaxReturns.push(htr);
      }
    });
  }

  // selectedTaxReturns配列からHeroTaxReturnを削除
  closeTaxReturn(ix: number): void {
    this.selectedTaxReturns.splice(ix, 1);
  }
}

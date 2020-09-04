import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HeroTaxReturn } from './hero-tax-return';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroes: Hero[] = [
    { id: 1, name: 'RubberMan', tid: '082-27-5678' },
    { id: 2, name: 'Tornado', tid: '099-42-4321' },
  ];

  heroTaxReturns: HeroTaxReturn[] = [
    new HeroTaxReturn(10, this.heroes[0], 35000),
    new HeroTaxReturn(20, this.heroes[1], 1250000),
  ];

  // ヒーローをObservableで返却
  getHeroes(): Observable<Hero[]> {
    return new Observable<Hero[]>((observer: Observer<Hero[]>) => {
      observer.next(this.heroes);
      observer.complete();
    });
  }

  // 引数で渡ってきたヒーローのHeroTaxReturnをObservableで返却
  // 引数で渡ってきたヒーローのHeroTaxReturnが存在しない場合は、新しくHeroTaxReturnを作成して返却
  getTaxReturn(hero: Hero): Observable<HeroTaxReturn> {
    return new Observable<HeroTaxReturn>((observer: Observer<HeroTaxReturn>) => {
      // heroTaxReturns配列から引数で渡ってきたヒーローのHeroTaxReturnを抽出
      const htr = this.heroTaxReturns.find(t => t.hero.id === hero.id);
      observer.next(htr || new HeroTaxReturn(0, hero));
      observer.complete();
    });
  }

  // 引数で渡ってきたHeroTaxReturnで元のHeroTaxReturnを更新
  // 引数で渡ってきたHeroTaxReturnが存在しない場合は、新しく作成する
  saveTaxReturn(heroTaxReturn: HeroTaxReturn): Observable<HeroTaxReturn> {
    return new Observable<HeroTaxReturn>((observer: Observer<HeroTaxReturn>) => {
      // heroTaxReturns配列から引数で渡ってきたHeroTaxReturnを抽出（引数で渡ってきたHeroTaxReturnが配列に含まれているか調べる）
      const htr = this.heroTaxReturns.find(t => t.id === heroTaxReturn.id);
      if (htr) {
        // 元の値を置き換える（htr変数はheroTaxReturns配列にあるオブジェクトの参照を持っている）
        heroTaxReturn = Object.assign(htr, heroTaxReturn);
      } else {
        this.heroTaxReturns.push(heroTaxReturn);
      }
      observer.next(heroTaxReturn);
      observer.complete();
    });
  }
}

import { Injectable } from '@angular/core';

import { HeroTaxReturn } from './hero-tax-return';
import { HeroesService } from './heroes.service';

@Injectable()
export class HeroTaxReturnService {
  private currentTaxReturn: HeroTaxReturn; // 修正中の値
  private originalTaxReturn: HeroTaxReturn; // 修正前のオリジナルの値

  constructor(private heroesService: HeroesService) { }

  // 引数で受け取ったHeroTaxReturnをオリジナルの値として保管しつつ、currentTaxReturnをセット
  set taxReturn(htr: HeroTaxReturn) {
    this.originalTaxReturn = htr;
    this.currentTaxReturn = htr.clone(); // オリジナルの値に影響を加えないために新しいオブジェクト参照を作成して格納
  }

  // 修正中の値を返す
  get taxReturn(): HeroTaxReturn {
    return this.currentTaxReturn;
  }

  // オリジナルの値に戻す
  restoreTaxReturn(): void {
    this.taxReturn = this.originalTaxReturn;
  }

  // 修正中の値を正規の値として保存する
  saveTaxReturn(): void {
    this.taxReturn = this.currentTaxReturn;
    this.heroesService.saveTaxReturn(this.currentTaxReturn).subscribe();
  }
}

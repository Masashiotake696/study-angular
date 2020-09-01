import { Pipe, PipeTransform } from '@angular/core';

import { FlyingHeroesPipe } from './flying-heroes.pipe';

@Pipe({
  name: 'flyingHeroesImpure',
  pure: false, // impureなパイプ（配列の要素の変更など、複合オブジェクト内の変更を検知する）として定義する
})
export class FlyingHeroesImpurePipe extends FlyingHeroesPipe implements PipeTransform {}

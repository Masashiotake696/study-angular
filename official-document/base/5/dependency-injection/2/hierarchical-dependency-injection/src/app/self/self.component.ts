import { Component, Self } from '@angular/core';

import { FlowerService } from '../flower.service';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css'],
  providers: [
    { provide: FlowerService, useValue: { emoji: '🌼' } },
  ]
})
export class SelfComponent {

  // @Self()を使用すると、Angularが現在のコンポーネントまたはディレクティブのElementInjectorのみを参照するようになる
  // サービスを注入するが、現在のホスト要素のみで利用できる場合、@Self()の適切なユースケースとなる
  constructor(@Self() public flower: FlowerService) { }

}

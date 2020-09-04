import { Component, SkipSelf } from '@angular/core';

import { LeafService } from '../leaf.service';

@Component({
  selector: 'app-skipself',
  templateUrl: './skipself.component.html',
  styleUrls: ['./skipself.component.css'],
  // Angular would ignore this LeafService instance
  providers: [
    { provide: LeafService, useValue: { emoji: '🍁' } },
  ]
})
export class SkipselfComponent {

  // @SkipSelf()は@Self()の反対
  // @SkipSelf()を使用すると、Angularは現在のElementInjectorではなく、親のElementInjectorからサービスの検索を開始する
  constructor(@SkipSelf() public leaf: LeafService) { }

}

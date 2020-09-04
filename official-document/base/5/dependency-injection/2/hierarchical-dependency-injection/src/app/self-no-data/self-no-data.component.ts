import { Component, Self, Optional } from '@angular/core';

import { LeafService } from '../leaf.service';

@Component({
  selector: 'app-self-no-data',
  templateUrl: './self-no-data.component.html',
  styleUrls: ['./self-no-data.component.css']
})
export class SelfNoDataComponent {

  // @Self()はインジェクターに現在のホスト要素で検索を停止するように指示するため、親プロバイダーが存在するが、leafはnullを返す
  constructor(@Self() @Optional() public leaf?: LeafService) { }

}

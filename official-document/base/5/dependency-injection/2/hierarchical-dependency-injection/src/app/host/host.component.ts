import { Component, Host, Optional } from '@angular/core';

import { FlowerService } from '../flower.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  // Provide the service
  providers: [
    { provide: FlowerService, useValue: { emoji: '🌼' } },
  ]
})
export class HostComponent {

  // @Host()を使用すると、プロバイダーを検索する時に、コンポーネントをインジェクターツリーの終点として指定できる
  // ツリーのさらに上にサービスインスタンスがあっても、Angularは検索を続行しない
  constructor(@Host() @Optional() public flower?: FlowerService) { }

}

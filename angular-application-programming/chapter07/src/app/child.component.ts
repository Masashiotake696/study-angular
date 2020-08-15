import { Component } from '@angular/core'
import { OverService, SpecialOverService } from './over.service'

@Component({
  selector: 'my-child',
  // app.component.tsで定義している同一のOverServiceトークンを上書き
  providers: [
    { provide: OverService, useClass: SpecialOverService },
  ],
  template: `
    <p>ChildComponent：{{ overService.show() }}</p>
  `
})
export class ChildComponent {
  // 注入のキーはあくまでOverService
  constructor(private overService: OverService) {
  }
}

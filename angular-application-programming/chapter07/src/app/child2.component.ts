import { Component, OnInit, Optional } from '@angular/core'
import { UseService } from './use.service'

@Component({
  selector: 'my-child2',
  template: `
    <p>{{ current }}</p>
  `
})
export class Child2Component implements OnInit {
  current = ''

  constructor(@Optional() private useService: UseService) {}

  // サービスが存在しない場合には、処理をスキップ
  ngOnInit() {
    if (this.useService) {
      this.current = this.useService.show()
    }
  }
}

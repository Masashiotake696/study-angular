import { Component } from '@angular/core'
import { UseService } from './use.service'

@Component({
  selector: 'my-child3',
  template: `
    <div>UseService：{{ current }}</div>
  `
})
export class Child3Component {
  current: string

  // UseServiceサービスで現在時刻を表示
  constructor(private useService: UseService) {
    this.current = this.useService.show()
  }
}

import { Component, Input } from '@angular/core'

@Component({
  selector: 'my-child2',
  template: `
    <div>
      三行詩{{ index }}：<input name="poem" [(ngModel)]="poem" size="20" />
    </div>
  `
})
export class Child2Component {
  // インデックス値
  @Input() index: number

  // テキストボックスの入力値
  poem: string
}

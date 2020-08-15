import { Component, AfterContentChecked, ContentChild } from '@angular/core'
import { Child3Component } from './child-3.component'

@Component({
  selector: 'my-parent',
  template: `
    <ng-content></ng-content>
    <p>完成：{{ poem }}</p>
  `
})
export class ParentComponent implements AfterContentChecked {
  // Child3Componentを取得
  @ContentChild(Child3Component) child: Child3Component

  poem = ''

  ngAfterContentChecked() {
    if (this.poem !== this.child.poem) {
      this.poem = this.child.poem
    }
  }
}

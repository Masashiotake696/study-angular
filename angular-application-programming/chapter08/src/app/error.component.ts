import { Component } from '@angular/core'

@Component({
  template: `
    <div class="component">
      <h2>エラー！</h2>
      <p>ページが見当たりません。</p>
    </div>
  `,
  styles: [`
    div h2 {
      background-color: #f00;
    }
  `]
})
export class ErrorComponent {}

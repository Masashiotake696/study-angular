import { Component } from '@angular/core'
import { UseService } from './use.service'

@Component({
  selector: 'my-parent3',
  providers: [
    UseService,
  ],
  // 外部コンテンツからアクセスできないサービスを登録
  // viewProviders: [
  //   UseService,
  // ],
  template: `
    <h3>ビュー</h3>
    <my-child3></my-child3>
    <h3>外部コンテンツ</h3>
    <ng-content></ng-content>
  `
})
export class Parent3Component {}

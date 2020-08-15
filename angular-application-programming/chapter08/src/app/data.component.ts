import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <h2>Data</h2>
    <p>カテゴリー：{{ category }}</p>
  `
})
export class DataComponent implements OnInit {
  category = ''

  // ActivatedRouteサービスをインスタンス化
  constructor(private route: ActivatedRoute) {}

  // dataプロパティの値を取得
  ngOnInit() {
    this.route.data.subscribe(
      object => this.category = object['category']
    )
  }
}

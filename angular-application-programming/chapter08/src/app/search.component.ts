import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <ul>
      <li>キーワード：{{ keyword }}</li>
    </ul>
  `
})
export class SearchComponent implements OnInit {
  keyword = ''

  // ActivatedRouteサービスをインスタンス化
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(
      strings => this.keyword = strings.join(' ')
    )
  }
}

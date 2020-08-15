import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <h3>ページ番号：{{ page }}</h3>
  `
})
export class ChildComponent implements OnInit {
  page = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log('child', params)
        this.page = params['page']
      }
    )

    this.route.parent.params.subscribe(
      params => {
        console.log('parent', params)
      }
    )
  }
}

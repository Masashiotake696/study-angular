import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <ul>
      <li *ngFor="let comment of comments">{{ comment }}</li>
    </ul>
  `
})
export class HatenaComponent implements OnInit {
  url = ''
  comments: string[] = []

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let result: string[] = []
    this.route.data.subscribe(
      data => {
        data['hatena'].bookmarks.forEach((value: any) => {
          if (value.comment !== '') {
            result.push(value.comment)
          }
        })
        this.comments = result
      }
    )
  }
}

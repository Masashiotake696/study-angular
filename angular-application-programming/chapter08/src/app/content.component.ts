import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  template: `
    <div>
      <h1>記事情報 No.{{ id }}</h1>
      <!-- 親コンポーネントからの相対パスで指定 -->
      <a routerLink="./pages/1" routerLinkActive="current">1</a>
      <a routerLink="./pages/2" routerLinkActive="current">2</a>
    </div>
    <!-- 子コンポーネントを埋め込む -->
    <router-outlet></router-outlet>
    <hr />
    <!-- 絶対パスで指定 -->
    <a routerLink="/" routerLinkActive="current" [routerLinkActiveOptions]="{ exact: true }">トップページ</a>
  `,
  styles: [`
    .current {
      background-color: '#ff0';
    }
  `]
})
export class ContentComponent implements OnInit {
  id = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => this.id = params['id']
    )
  }
}

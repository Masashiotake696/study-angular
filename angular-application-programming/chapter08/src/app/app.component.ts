import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li>
        <!-- { exact: true }を指定することで、/examなどのパスでもrouterLinkActiveが反応しないようにする -->
        <a routerLink="/" routerLinkActive="current" [routerLinkActiveOptions]="{ exact: true }">メインページ</a>
      </li>
      <li>
        <a routerLink="/exam" routerLinkActive="current">Exampleページ</a>
      </li>
      <li>
        <a routerLink="/article/13" routerLinkActive="current">記事 No.13</a>
      </li>
      <li>
        <a routerLink="/article/108" routerLinkActive="current">記事 No.108</a>
      </li>
      <li>
        <!-- queryParamsでクエリを、fragmentでフラグメントを指定 -->
        <a routerLink="/param" routerLinkActive="current" [queryParams]="{ category: 'Angular', keyword: 'Routing' }" fragment="hoge">クエリ情報/フラグメント</a>
      </li>
      <li>
        <!-- queryParamsHandling="preserve"で前のページのクエリを維持/preserveFragmentで前のページのフラグメントを維持 -->
        <a routerLink="/param" queryParamsHandling="preserve" preserveFragment routerLinkActive="current">クエリ情報/フラグメント（維持）</a>
      </li>
      <li>
        <a routerLink="/data" routerLinkActive="current">Dataページ</a>
      </li>
      <li>
        <a routerLink="/search/Angular/Karma/Rx" routerLinkActive="current">「Angular/Karma/Rx」の検索</a>
      </li>
      <li>
        <!-- プロパティバインディングでパスを指定 -->
        <a [routerLink]="['/hatena', 'http://gihyo.jp/']" routerLinkActive="current">ブックマークコメント</a>
      </li>
      <li>
        <!-- outletsキーでotherビューのパスを指定 -->
        <a [routerLink]="[{ outlets: { other: ['search-other'] } }]" routerLinkActive="current">Otherビュー</a>
      </li>
      <li>
        <!-- outletsキーでメインビューとotherビューのパスを指定 -->
        <a [routerLink]="[{ outlets: { primary: ['main'], other: ['search-other'] }}]" routerLinkActive="current" [routerLinkActiveOptions]="{ exact: true }">メインページ/Otherビュー</a>
      </li>
      <li>
        <a routerLink="/contents/100" routerLinkActive="current">記事 No.100</a>
      </li>
      <li>
        <a routerLink="/contents/100/pages/1" routerLinkActive="current">記事 No.100</a>
      </li>
      <li>
        <a [routerLink]="['/contents', 108, 'pages', 1]" routerLinkActive="current">記事 No.108</a>
      </li>
      <li>
        <a routerLink="/dummy" routerLinkActive="current">不正なページ</a>
      </li>
    </ul>
    <router-outlet></router-outlet>

    <hr />

    <router-outlet name="other"></router-outlet>
  `,
  styles: [`
    .current {
      background-color: #ff0;
    }
  `]
})
export class AppComponent { }

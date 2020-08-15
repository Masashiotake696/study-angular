import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HatenaResolver } from './hatena-resolver.service'
import { HatenaComponent } from './hatena.component'
import { HatenaService } from './hatena.service'
import { JsonpModule } from '@angular/http'
import { ArticleComponent } from './article.component'
import { TimeGuard } from './time.guard'

const myRoutes = [
  // リゾルバーを伴う/hatenaルートを宣言
  {
    path: 'hatena/:url',
    component: HatenaComponent,
    resolve: {
      hatena: HatenaResolver
    }
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    canActivate: [ TimeGuard ],
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(myRoutes),
    JsonpModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HatenaService,
    HatenaResolver,
    TimeGuard,
  ]
})
export class AppRoutingModule {}

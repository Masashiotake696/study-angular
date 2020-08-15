import { ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'

import { MainComponent } from './main.component'
import { ExampleComponent } from './example.component'
import { ErrorComponent } from './error.component'
import { ArticleComponent } from './article.component'
import { ParamComponent } from './param.component'
import { DataComponent } from './data.component'
import { SearchComponent } from './search.component'
import { ContentComponent } from './content.component'
import { ChildComponent } from './child.component'

// ルーティングテーブルの準備
const myRoutes = [
  { path: 'exam', component: ExampleComponent },
  { path: 'main', component: MainComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'param', component: ParamComponent },
  { path: 'data', component: DataComponent, data: { category: 'Angular' } },
  { path: 'search',
    children: [
      { path: '**', component: SearchComponent }
    ]
  },
  { path: 'search-other', component: SearchComponent, outlet: 'other' },
  // { path: '', redirectTo: '/main(other:search-other)', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: '', component: MainComponent },
      { path: '', component: SearchComponent, outlet: 'other' }
    ],
  },
  {
    path: 'contents/:id',
    component: ContentComponent,
    children: [
      { path: 'pages/:page', component: ChildComponent }
    ],
    // pathMatch: 'full'
  },
  // **は任意のパス
  { path: '**', redirectTo: '/' },
]

// ルーターモジュールを生成
export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes)

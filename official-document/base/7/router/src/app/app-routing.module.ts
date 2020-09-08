import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup' // outletのname属性の値がpopupであるoutletにルーティングを反映
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // モジュールの読み込み前にガードを適応
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    // データプロパティを渡す
    data: {
      preload: true
    }
  },
  {
    path: '',
    redirectTo: '/superheroes',
    pathMatch: 'full' // パスが完全一致した場合のみリダイレクト
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // debugging purposes only
    preloadingStrategy: SelectivePreloadingStrategyService, // 事前読み込み戦略にサービスを指定
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

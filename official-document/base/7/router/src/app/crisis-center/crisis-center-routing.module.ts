import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            // コンポーネントを離れた後、次のルートを読み込む前にガードを適応
            canDeactivate: [CanDeactivateGuard],
            // 動的にdataを設定する
            resolve: {
              crisis: CrisisDetailResolverService
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }

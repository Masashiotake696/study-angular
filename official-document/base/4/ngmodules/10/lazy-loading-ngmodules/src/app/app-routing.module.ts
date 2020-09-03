import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers-routing.module').then(m => m.CustomersRoutingModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders-routing.module').then(m => m.OrdersRoutingModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }

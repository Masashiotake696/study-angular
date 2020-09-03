import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'items', loadChildren: () => import('./items/items.module').then(module => module.ItemsModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(module => module.CustomersModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}

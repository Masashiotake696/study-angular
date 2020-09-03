import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsDetailComponent } from './items-detail/items-detail.component';

import { ItemsService } from './items.service';

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemsDetailComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ],
  providers: [
    ItemsService,
  ]
})
export class ItemsModule { }

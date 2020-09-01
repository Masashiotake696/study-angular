import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { StoutItemComponent, BestItemComponent, DeviceItemComponent, LostItemComponent, UnknownItemComponent } from './item-switch/item-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    StoutItemComponent, BestItemComponent, DeviceItemComponent, LostItemComponent, UnknownItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

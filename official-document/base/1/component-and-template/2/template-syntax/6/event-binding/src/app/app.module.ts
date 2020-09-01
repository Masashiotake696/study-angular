import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClickDirective } from './click.directive';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickDirective,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

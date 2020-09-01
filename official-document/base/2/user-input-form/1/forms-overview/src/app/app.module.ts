import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFavoriteColorComponent } from './reactive-favorite-color/reactive-favorite-color.component';
import { TemplateFavoriteColorComponent } from './template-favorite-color/template-favorite-color.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFavoriteColorComponent,
    TemplateFavoriteColorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroFormTemplateComponent } from './hero-form-template/hero-form-template.component';
import { HeroFormReactiveComponent } from './hero-form-reactive/hero-form-reactive.component';
import { ForbiddenNameDirective } from './forbidden-name.directive';
import { IdentityRevealedDirective } from './identity-revealed.directive';
import { UniqueAlterEgoDirective } from './unique-alter-ego.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormTemplateComponent,
    HeroFormReactiveComponent,
    ForbiddenNameDirective,
    IdentityRevealedDirective,
    UniqueAlterEgoDirective
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

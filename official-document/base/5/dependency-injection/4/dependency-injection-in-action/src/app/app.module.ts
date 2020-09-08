import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SortedHeroesComponent } from './sorted-heroes/sorted-heroes.component';
import { HeroesBaseComponent } from './heroes-base/heroes-base.component';
import { HeroBioComponent } from './hero-bio/hero-bio.component';
import { HeroBiosComponent } from './hero-bios/hero-bios.component';
import { HeroBiosAndContactsComponent } from './hero-bios-and-contacts/hero-bios-and-contacts.component';
import { HeroContactComponent } from './hero-contact/hero-contact.component';
import { HighlightDirective } from './highlight.directive';
import { StorageComponent } from './storage/storage.component';
import { HeroOfTheMonthComponent } from './hero-of-the-month/hero-of-the-month.component';
import {
  CarolComponent,
  ChrisComponent,
  CraigComponent,
  BarryComponent,
  BobComponent,
  BethComponent,
  AlexComponent,
  AliceComponent,
  CathyComponent,
  ParentFinderComponent
} from './parent-finder/parent-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    SortedHeroesComponent,
    HeroesBaseComponent,
    HeroBioComponent,
    HeroBiosComponent,
    HeroBiosAndContactsComponent,
    HeroContactComponent,
    HighlightDirective,
    StorageComponent,
    HeroOfTheMonthComponent,
    CarolComponent,
    ChrisComponent,
    CraigComponent,
    BarryComponent,
    BobComponent,
    BethComponent,
    AlexComponent,
    AliceComponent,
    CathyComponent,
    ParentFinderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { InjectorComponent } from './injector.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroesTspComponent } from './heroes/heroes-tsp/heroes-tsp.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';

import { ProvidersModule } from './providers/providers.module';
import { APP_CONFIG, HERO_DI_CONFIG } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    InjectorComponent,
    HeroesComponent,
    HeroesTspComponent,
    HeroListComponent,
  ],
  imports: [
    BrowserModule,
    ProvidersModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { PowerBoosterComponent } from './power-booster/power-booster.component';
import { PowerBoostCalculatorComponent } from './power-boost-calculator/power-boost-calculator.component';
import { FlyingHeroesComponent } from './flying-heroes/flying-heroes.component';
import { FlyingHeroesPipe } from './flying-heroes.pipe';
import { FlyingHeroesImpurePipe } from './flying-heroes-impure.pipe';
import { HeroAsyncMessageComponent } from './hero-async-message/hero-async-message.component';
import { FetchJsonPipe } from './fetch-json.pipe';
import { HeroListComponent } from './hero-list/hero-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ExponentialStrengthPipe,
    PowerBoosterComponent,
    PowerBoostCalculatorComponent,
    FlyingHeroesComponent,
    FlyingHeroesPipe,
    FlyingHeroesImpurePipe,
    HeroAsyncMessageComponent,
    FetchJsonPipe,
    HeroListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { AdDirective } from './ad.directive';
import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdBannerComponent,
    AdDirective,
    HeroJobAdComponent,
    HeroProfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

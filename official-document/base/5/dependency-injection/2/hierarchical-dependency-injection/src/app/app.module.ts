import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OptionalComponent } from './optional/optional.component';
import { HostComponent } from './host/host.component';
import { HostChildComponent } from './host-child/host-child.component';
import { HostParentComponent } from './host-parent/host-parent.component';
import { SelfComponent } from './self/self.component';
import { SelfNoDataComponent } from './self-no-data/self-no-data.component';
import { SkipselfComponent } from './skipself/skipself.component';
import { ChildComponent } from './child/child.component';
import { InspectorComponent } from './inspector/inspector.component';
import { CarsComponent, ACarComponent, BCarComponent, CCarComponent  } from './cars/cars.component';
import { HeroTaxReturnComponent } from './hero-tax-return/hero-tax-return.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { VillainsListComponent } from './villains-list/villains-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionalComponent,
    HostComponent,
    HostChildComponent,
    HostParentComponent,
    SelfComponent,
    SelfNoDataComponent,
    SkipselfComponent,
    ChildComponent,
    InspectorComponent,
    CarsComponent,
    ACarComponent,
    BCarComponent,
    CCarComponent,
    HeroTaxReturnComponent,
    HeroesListComponent,
    VillainsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

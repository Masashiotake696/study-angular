import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ZippyComponent } from './zippy/zippy.component';
import { AsyncObservablePipeComponent } from './async-observable-pipe/async-observable-pipe.component';
import { Routable1Component } from './routable1/routable1.component';
import { Routable2Component } from './routable2/routable2.component';
import { MyComponent } from './my/my.component';

@NgModule({
  declarations: [
    AppComponent,
    ZippyComponent,
    AsyncObservablePipeComponent,
    Routable1Component,
    Routable2Component,
    MyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

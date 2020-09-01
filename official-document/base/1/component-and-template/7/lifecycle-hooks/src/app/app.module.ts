import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeekABooComponent } from './peek-a-boo/peek-a-boo.component';
import { PeekABooParentComponent } from './peek-a-boo-parent/peek-a-boo-parent.component';
import { SpyDirective } from './spy.directive';
import { SpyComponent } from './spy/spy.component';
import { CounterComponent } from './counter/counter.component';
import { CounterParentComponent } from './counter-parent/counter-parent.component';
import { OnChangesComponent } from './on-changes/on-changes.component';
import { OnChangesParentComponent } from './on-changes-parent/on-changes-parent.component';
import { ChildViewComponent } from './child-view/child-view.component';
import { AfterViewComponent } from './after-view/after-view.component';
import { AfterViewParentComponent } from './after-view-parent/after-view-parent.component';
import { ChildComponent } from './child/child.component';
import { AfterContentComponent } from './after-content/after-content.component';
import { AfterContentParentComponent } from './after-content-parent/after-content-parent.component';
import { DoCheckComponent } from './do-check/do-check.component';
import { DoCheckParentComponent } from './do-check-parent/do-check-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    PeekABooComponent,
    PeekABooParentComponent,
    SpyDirective,
    SpyComponent,
    CounterComponent,
    CounterParentComponent,
    OnChangesComponent,
    OnChangesParentComponent,
    ChildViewComponent,
    AfterViewComponent,
    AfterViewParentComponent,
    ChildComponent,
    AfterContentComponent,
    AfterContentParentComponent,
    DoCheckComponent,
    DoCheckParentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CoopModule } from './coop/coop.module'

import { AppComponent } from './app.component'
import { ChildComponent } from './child.component'
import { Child2Component } from './child-2.component'
import { ContentComponent } from './content.component'
import { ParentComponent } from './parent.component'
import { Child3Component } from './child-3.component'
import { Child4Component } from './child-4.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CoopModule,
  ],
  declarations: [
    AppComponent,
    ChildComponent,
    Child2Component,
    ContentComponent,
    ParentComponent,
    Child3Component,
    Child4Component,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

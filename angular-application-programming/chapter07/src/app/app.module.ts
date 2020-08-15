import { NgModule, Provider } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { UseComponent } from './use.component'
import { BookService } from './book.service'

import { Hoge } from './hoge'
import { APP_INFO, MY_APP_INFO } from './app-info'
import { KEYWORDS } from './app-info'

import { ChildComponent } from './child.component'

import { Parent2Component } from './parent2.component'
import { Child2Component } from './child2.component'
import { NoParent2Component } from './no-parent2.component'

import { Parent3Component } from './parent3.component'
import { Child3Component } from './child3.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    UseComponent,
    ChildComponent,
    Parent2Component,
    Child2Component,
    NoParent2Component,
    Parent3Component,
    Child3Component,
  ],
  providers: [
    BookService, // 省略構文
    <Provider> { provide: BookService, useClass: BookService, multi: false }, // 非省略構文
    { provide: Hoge, useClass: BookService },
    { provide: APP_INFO, useValue: MY_APP_INFO },
    { provide: KEYWORDS, useValue: 'TypeScript', multi: true },
    { provide: KEYWORDS, useValue: 'Angular', multi: true },
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

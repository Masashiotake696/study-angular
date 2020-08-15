import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpModule, JsonpModule, RequestOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http'

import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

import { AppComponent }  from './app.component';
import { BooksData } from './books-data';

import { MyRequestOptions } from './my-request-options'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(BooksData),
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent],
  providers: [
    { provide: RequestOptions, useClass: MyRequestOptions },
    { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('CSRF-TOKEN', 'X-CSRF-TOKEN') },
  ]
})
export class AppModule { }

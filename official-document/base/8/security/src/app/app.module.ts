import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BypassSecurityComponent } from './bypass-security/bypass-security.component';
import { InnerHtmlBindingComponent } from './inner-html-binding/inner-html-binding.component';

@NgModule({
  declarations: [
    AppComponent,
    BypassSecurityComponent,
    InnerHtmlBindingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

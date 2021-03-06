import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { UploaderComponent } from './uploader/uploader.component';

import { MessageService } from './message.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { AuthService } from './auth.service';
import { RequestCacheService } from './request-cache.service';

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DownloaderComponent,
    HeroesComponent,
    MessagesComponent,
    PackageSearchComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    )
  ],
  providers: [
    MessageService,
    HttpErrorHandlerService,
    httpInterceptorProviders,
    AuthService,
    RequestCacheService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

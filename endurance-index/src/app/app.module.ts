import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatDisplayComponent } from './stat-display/stat-display.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [AppComponent, StatDisplayComponent, MessagesComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
57700738a0a719535c146304a879637d4463e518

curl -X POST https://www.strava.com/api/v3/oauth/token \
  -d client_id=73837 \
  -d client_secret=77f492b5ca6be20b52e95eb20def21a86a9de867 \
  -d code=ced73d141b70ca058392d27726efcab7c6b22e9f \
  -d grant_type=authorization_code
  */

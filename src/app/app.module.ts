import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './views/home-page/home-page.component';
import { HomePageModule } from './views/home-page/home-page.module';
import { TokenPageModule } from './views/token-page/token-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    TokenPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

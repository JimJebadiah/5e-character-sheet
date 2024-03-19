import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './views/home-page/home-page.module';
import { TokenPageModule } from './views/token-page/token-page.module';
import { CharacterSheetPageModule } from './views/character-sheet-page/character-sheet-page.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    TokenPageModule,
    CharacterSheetPageModule,
    HttpClientModule,
    HammerModule,
    CdkScrollableModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

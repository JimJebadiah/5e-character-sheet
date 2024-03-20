import { NotFoundModule } from './views/not-found/not-found.module';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './views/home-page/home-page.module';
import { TokenPageModule } from './views/token-page/token-page.module';
import { CharacterSheetPageModule } from './views/character-sheet-page/character-sheet-page.module';
import { HttpClientModule } from '@angular/common/http';
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
    CdkScrollableModule,
    NotFoundModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

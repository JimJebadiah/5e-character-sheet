import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CharacterModule } from './character/character.module';
import { CreateCharacterModule } from './create-character/create-character.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CharacterModule,
    CreateCharacterModule,
    HeaderModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ImagePreloadModule } from 'src/app/directives/image-preload/image-preload.module';
import {CharacterImageModule} from "../../../components/character-image/character-image.module";



@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ImagePreloadModule,
    CharacterImageModule
  ],
  exports: [CharacterComponent]
})
export class CharacterModule { }

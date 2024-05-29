import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CharacterImageComponent} from "./character-image.component";



@NgModule({
  declarations: [CharacterImageComponent],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [CharacterImageComponent]
})
export class CharacterImageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCharacterComponent } from './create-character.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CreateCharacterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [CreateCharacterComponent]
})
export class CreateCharacterModule { }

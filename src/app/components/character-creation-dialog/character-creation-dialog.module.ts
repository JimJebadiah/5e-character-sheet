import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterCreationDialogComponent} from './character-creation-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CharacterCreationDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    ReactiveFormsModule,
  ],
  exports: [
    CharacterCreationDialogComponent
  ]
})
export class CharacterCreationDialogModule { }

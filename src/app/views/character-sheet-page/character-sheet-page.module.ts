import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterSheetPageComponent } from './character-sheet-page.component';
import { HeaderModule } from 'src/app/components/header/header.module';



@NgModule({
  declarations: [
    CharacterSheetPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class CharacterSheetPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterSheetPageComponent } from './character-sheet-page.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { StatBlockModule } from './stat-block/stat-block.module';
import { InfoBlockModule } from './info-block/info-block.module';



@NgModule({
  declarations: [
    CharacterSheetPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    InfoBlockModule,
    StatBlockModule
  ]
})
export class CharacterSheetPageModule { }

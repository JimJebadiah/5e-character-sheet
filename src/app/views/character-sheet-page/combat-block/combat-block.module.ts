import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatBlockComponent } from './combat-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HpBlockModule } from './hp-block/hp-block.module';
import { AisBlockModule } from './ais-block/ais-block.module';
import { WeaponsBlockModule } from './weapons-block/weapons-block.module';



@NgModule({
  declarations: [
    CombatBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    EditableModule,
    HpBlockModule,
    AisBlockModule,
    WeaponsBlockModule
  ],
  exports: [
    CombatBlockComponent
  ]
})
export class CombatBlockModule { }

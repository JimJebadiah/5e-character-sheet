import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatBlockComponent } from './combat-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';
import { MatCheckboxModule } from '@angular/material/checkbox';



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
  ],
  exports: [
    CombatBlockComponent
  ]
})
export class CombatBlockModule { }

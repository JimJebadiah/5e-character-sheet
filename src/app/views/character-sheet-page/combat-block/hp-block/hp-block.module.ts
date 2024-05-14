import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HpBlockComponent } from './hp-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';
import {MatIconButton} from '@angular/material/button';



@NgModule({
  declarations: [
    HpBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    EditableModule,
    MatIconButton,
  ],
  exports: [
    HpBlockComponent
  ]
})
export class HpBlockModule { }

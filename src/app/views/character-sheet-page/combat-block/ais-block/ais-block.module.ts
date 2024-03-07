import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AisBlockComponent } from './ais-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';



@NgModule({
  declarations: [
    AisBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    EditableModule,
  ],
  exports: [
    AisBlockComponent
  ]
})
export class AisBlockModule { }

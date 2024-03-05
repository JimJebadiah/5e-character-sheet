import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeBlockComponent } from './attribute-block.component';
import { MatCardModule } from '@angular/material/card';
import { EditableModule } from 'src/app/directives/editable.module';



@NgModule({
  declarations: [
    AttributeBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    EditableModule
  ],
  exports: [AttributeBlockComponent],
})
export class AttributeBlockModule { }

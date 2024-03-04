import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeBlockComponent } from './attribute-block.component';
import { MatCardModule } from '@angular/material/card';
import { EditableNumberModule } from 'src/app/directives/editable-number/editable-number.module';



@NgModule({
  declarations: [
    AttributeBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    EditableNumberModule
  ],
  exports: [AttributeBlockComponent],
})
export class AttributeBlockModule { }

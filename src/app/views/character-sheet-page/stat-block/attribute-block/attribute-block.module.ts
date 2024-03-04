import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeBlockComponent } from './attribute-block.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AttributeBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [AttributeBlockComponent],
})
export class AttributeBlockModule { }

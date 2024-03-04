import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableNumberDirective } from './editable-number.directive';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    EditableNumberDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    EditableNumberDirective
  ]
})
export class EditableNumberModule { }

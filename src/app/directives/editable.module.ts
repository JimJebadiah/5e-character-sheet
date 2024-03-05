
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableNumberDirective } from './editable-number/editable-number.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { EditableDialogModule } from '../components/editable-dialog/editable-dialog.module';
import { EditableStringDirective } from './editable-string/editable-string.directive';


@NgModule({
  declarations: [
    EditableNumberDirective,
    EditableStringDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    EditableDialogModule
  ],
  exports: [
    EditableNumberDirective,
    EditableStringDirective
  ]
})
export class EditableModule { }

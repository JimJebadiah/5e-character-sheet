import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableNumberDialogComponent } from './editable-number-dialog/editable-number-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EditableStringDialogComponent } from './editable-string-dialog/editable-string-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    EditableNumberDialogComponent,
    EditableStringDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    EditableNumberDialogComponent,
    EditableStringDialogComponent
  ]
})
export class EditableDialogModule { }

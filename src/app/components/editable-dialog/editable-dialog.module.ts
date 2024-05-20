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
import { EditableNumberStepDialogComponent } from './editable-number-step-dialog/editable-number-step-dialog.component';
import {EditableLevelDialogComponent} from './editable-level-dialog/editable-level-dialog.component';
import {NumberFieldModule} from '../../directives/number-field/number-field.module';
import {MatCheckbox} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    EditableNumberDialogComponent,
    EditableStringDialogComponent,
    EditableNumberStepDialogComponent,
    EditableLevelDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NumberFieldModule,
    MatCheckbox
  ],
  exports: [
    EditableNumberDialogComponent,
    EditableStringDialogComponent,
    EditableNumberStepDialogComponent,
    EditableLevelDialogComponent
  ]
})
export class EditableDialogModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableNumberDirective } from './editable-number/editable-number.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { EditableDialogModule } from '../components/editable-dialog/editable-dialog.module';
import { EditableStringDirective } from './editable-string/editable-string.directive';
import { EditableNumberStepDirective } from './editable-number-step/editable-number-step.directive';
import {EditableLevelDirective} from './ediitable-level/editable-level.directive';
import {EditablePictureDirective} from './editable-picture/editable-picture.directive';

@NgModule({
  declarations: [
    EditableNumberDirective,
    EditableStringDirective,
    EditableNumberStepDirective,
    EditableLevelDirective,
    EditablePictureDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    EditableDialogModule
  ],
  exports: [
    EditableNumberDirective,
    EditableStringDirective,
    EditableNumberStepDirective,
    EditableLevelDirective,
    EditablePictureDirective
  ]
})
export class EditableModule { }

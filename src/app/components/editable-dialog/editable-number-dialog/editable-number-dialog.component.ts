import { Component, Inject } from '@angular/core';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractEditableDialog } from '../abstract-editable-dialog';

@Component({
  selector: 'app-editable-number-dialog',
  templateUrl: './editable-number-dialog.component.html',
  styleUrls: ['./editable-number-dialog.component.less']
})
export class EditableNumberDialogComponent extends AbstractEditableDialog<number, EditableNumberDialogComponent> {
  constructor(
    ref: MatDialogRef<EditableNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<number>, setter: Setter<number>}
  ) {
    super(ref, data);
  }

  minus() {
    this.value--;
  }

  plus() {
    this.value++;
  }
}

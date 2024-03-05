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

  private step: number;

  constructor(
    ref: MatDialogRef<EditableNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<number>, setter: Setter<number>, step: number}
  ) {
    super(ref, data);
    this.step = data.step;
  }

  minus() {
    this.value -= this.step;
  }

  plus() {
    this.value += this.step;
  }
}

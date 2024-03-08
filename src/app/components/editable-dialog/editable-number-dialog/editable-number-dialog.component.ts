import { Component, Inject } from '@angular/core';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractEditableDialog } from '../abstract-editable-dialog';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-editable-number-dialog',
  templateUrl: './editable-number-dialog.component.html',
  styleUrls: ['./editable-number-dialog.component.less']
})
export class EditableNumberDialogComponent extends AbstractEditableDialog<number, EditableNumberDialogComponent> {

  private step: number;
  private max: number;
  private min: number;

  constructor(
    ref: MatDialogRef<EditableNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<number>, setter: Setter<number>, hero: Hero, step: number, max: number, min: number}
  ) {
    super(ref, data);
    this.step = data.step;
    this.max = data.max;
    this.min = data.min;
  }

  minus() {
    this.value -= this.step;
    if (this.value < this.min) this.value = this.min;
  }

  plus() {
    this.value += this.step;
    if (this.value > this.max) this.value = this.max;
  }
}

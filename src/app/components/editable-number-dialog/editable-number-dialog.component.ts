import { Component, Inject } from '@angular/core';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editable-number-dialog',
  templateUrl: './editable-number-dialog.component.html',
  styleUrls: ['./editable-number-dialog.component.less']
})
export class EditableNumberDialogComponent {

  getter!: Getter;
  setter!: Setter;

  constructor(
    private readonly ref: MatDialogRef<EditableNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: {getter: Getter, setter: Setter}
  ) {
    this.getter = data.getter;
    this.setter = data.setter;
  }
}

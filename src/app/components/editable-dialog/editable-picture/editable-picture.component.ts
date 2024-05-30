import {Component, Inject} from '@angular/core';
import {AbstractEditableDialog} from '../abstract-editable-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Getter, Setter} from "../../../directives/editable-number/editable-number.directive";
import {Hero} from "../../../domain/hero";

@Component({
  selector: 'app-editable-picture',
  templateUrl: './editable-picture.component.html',
  styleUrl: './editable-picture.component.less'
})
export class EditablePictureComponent extends AbstractEditableDialog<string, unknown> {

  constructor(
    ref: MatDialogRef<EditablePictureComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<string>, setter: Setter<string>, hero: Hero, update: () => void},
  ) {
    super(ref, data);
  }

  uploadComplete() {
    this.cancel();
  }

  override confirm() {
    this.cancel();
  }
}

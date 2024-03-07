import { Component, Inject, OnInit } from '@angular/core';
import { AbstractEditableDialog } from '../abstract-editable-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-editable-string-dialog',
  templateUrl: './editable-string-dialog.component.html',
  styleUrls: ['./editable-string-dialog.component.less']
})
export class EditableStringDialogComponent extends AbstractEditableDialog<string, EditableStringDialogComponent> implements OnInit {

  form: FormGroup;
  control: FormControl<string | null>;

  constructor(
    ref: MatDialogRef<EditableStringDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<string>, setter: Setter<string>},
    private readonly fb: FormBuilder,
  ) {
    super(ref, data);
    this.control = this.fb.control('');
    this.form = this.fb.group({
      control: this.control
    });
    this.control.setValue(this.getter());
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((v) => {
      this.value = v!;
    });
  }

  override canSubmit(): boolean  {
    return this.value !== '';
  }
}

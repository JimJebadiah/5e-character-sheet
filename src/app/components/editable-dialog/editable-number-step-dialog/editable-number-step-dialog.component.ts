import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractEditableDialog } from '../abstract-editable-dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { EditableStringDialogComponent } from '../editable-string-dialog/editable-string-dialog.component';
import { GitdbService } from 'src/app/services/gitdb.service';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-editable-number-step-dialog',
  templateUrl: './editable-number-step-dialog.component.html',
  styleUrls: ['./editable-number-step-dialog.component.less']
})
export class EditableNumberStepDialogComponent extends AbstractEditableDialog<number, EditableNumberStepDialogComponent> implements OnInit {

  @ViewChild('input') elRef: any;

  PATTERN = /^[0-9]+$/;

  form: FormGroup;
  control: FormControl<string | null>;

  constructor(
    ref: MatDialogRef<EditableNumberStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<number>, setter: Setter<number>, hero: Hero, update: () => void},
    private readonly fb: FormBuilder,
  ) {
    super(ref, data);
    this.control = this.fb.control('');
    this.form = this.fb.group({
      control: this.control
    });
    this.control.setValue('');
    this.value = 0;
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((val) => {
      if (val! === '') {
        this.value = 0;
        this.elRef.nativeElement.value = '';
        return;
      }

      if (val!.length > 3) {
        this.elRef.nativeElement.value = val!.substring(0, val!.length - 1);
        return;
      }

      if (!this.PATTERN.test(val!)) {
        this.elRef.nativeElement.value = val!.substring(0, val!.length - 1);
      } else {
        this.value = Number.parseInt(this.elRef.nativeElement.value);
      }

      this.control.setValue(this.value.toString(), {emitEvent: false});
    });
    setTimeout(() => this.elRef.nativeElement.focus(), 0);
  }
}

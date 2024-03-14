import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Basic } from '../../list-data/basic-list-data/basic';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';

@Component({
  selector: 'app-list-dialog-basic',
  templateUrl: './list-dialog-basic.component.html',
  styleUrls: ['./list-dialog-basic.component.less']
})
export class ListDialogBasicComponent extends AbstractListDialog<Basic> implements OnInit {

  group: FormGroup;
  value: FormControl;

  basicValue: string = '';

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Basic>
  ) { 
    super(ref, data);

    this.value = fb.control('', [Validators.required]);

    this.group = fb.group({
      'value': this.value,
    });
  }

  ngOnInit(): void {
    this.value.valueChanges.subscribe((v) => {
      this.basicValue = v;
    });
  }

  override canSubmit(): boolean {
    return !this.value.hasError('required');
  }

  override createListType(): Basic {
    return new Basic(this.basicValue);
  }
  
  override setValues(): void {
    this.value.setValue(this.val!.val);
  }
}

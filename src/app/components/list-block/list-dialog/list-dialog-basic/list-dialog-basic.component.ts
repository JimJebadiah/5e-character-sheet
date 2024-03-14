import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Basic } from '../../list-data/basic-list-data/basic';

@Component({
  selector: 'app-list-dialog-basic',
  templateUrl: './list-dialog-basic.component.html',
  styleUrls: ['./list-dialog-basic.component.less']
})
export class ListDialogBasicComponent implements OnInit {

  group: FormGroup;
  value: FormControl;

  val: string = '';

  header: string;
  edit: boolean;
  index: number;

  constructor(
    fb: FormBuilder,
    private readonly ref: MatDialogRef<ListDialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) data: {header: string, edit: boolean, index: number}
  ) { 
    this.value = fb.control('', [Validators.required]);

    this.group = fb.group({
      'value': this.value,
    });

    this.header = data.header;
    this.edit = data.edit;
    this.index = data.index;
  }

  ngOnInit(): void {
    this.value.valueChanges.subscribe((v) => {
      this.val = v;
    })
  }

  canSubmit(): boolean {
    return !this.value.hasError('required');
  }

  confirm(): void {
    setTimeout(() => this.ref.close(new Basic(this.val)), 100);
  }

  cancel(): void {
    setTimeout(() => this.ref.close(null), 100);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    fb: FormBuilder,
    private readonly ref: MatDialogRef<ListDialogBasicComponent>
  ) { 
    this.value = fb.control('', [Validators.required]);

    this.group = fb.group({
      'value': this.value,
    });
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

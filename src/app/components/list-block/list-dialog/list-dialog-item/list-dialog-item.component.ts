import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Basic } from '../../list-data/basic-list-data/basic';
import { ListDialogBasicComponent } from '../list-dialog-basic/list-dialog-basic.component';

@Component({
  selector: 'app-list-dialog-item',
  templateUrl: './list-dialog-item.component.html',
  styleUrls: ['./list-dialog-item.component.less']
})
export class ListDialogItemComponent {
  group: FormGroup;
  name: FormControl;
  amount: FormControl;


  nameValue: string = '';

  constructor(
    fb: FormBuilder,
    private readonly ref: MatDialogRef<ListDialogItemComponent>,
    elRef: MatDialogRef<ListDialogItemComponent>,
  ) { 
    this.name = fb.control('', [Validators.required]);
    this.amount = fb.control<number>(0);

    this.group = fb.group({
      'name': this.name,
      'amount': this.amount
    });

    this.amount.setValue(0);
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameValue = v;
    })
  }

  canSubmit(): boolean {
    return !this.name.hasError('required');
  }

  confirm(): void {
    // setTimeout(() => this.ref.close(new Basic(this.val)), 100);
  }

  cancel(): void {
    setTimeout(() => this.ref.close(null), 100);
  }
}

import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Basic } from '../../list-data/basic-list-data/basic';
import { ListDialogBasicComponent } from '../list-dialog-basic/list-dialog-basic.component';
import { Item } from 'src/app/domain/item';

@Component({
  selector: 'app-list-dialog-item',
  templateUrl: './list-dialog-item.component.html',
  styleUrls: ['./list-dialog-item.component.less']
})
export class ListDialogItemComponent implements OnInit {
  @ViewChild('amountInput') amountRef: any;

  group: FormGroup;
  name: FormControl;
  amount: FormControl;
  description: FormControl;

  readonly PATTERN = /^[0-9]+$/;

  nameV: string = '';
  amountV: number = 1;
  descriptionV: string = '';
  
  header: string;
  edit: boolean;
  index: number;

  constructor(
    fb: FormBuilder,
    private readonly ref: MatDialogRef<ListDialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: {header: string, edit: boolean, index: number}
  ) { 
    this.name = fb.control('', [Validators.required]);
    this.amount = fb.control('1', [Validators.required]);
    this.description = fb.control<string>('');

    this.group = fb.group({
      'name': this.name,
      'amount': this.amount,
      'description': this.description,
    });

    this.amount.setValue('1');

    this.header = data.header;
    this.edit = data.edit;
    this.index = data.index;
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.amount.valueChanges.subscribe((val) => {
      if (val! === '') {
        this.amountV = 0;
        this.amountRef.nativeElement.value = '';
        return;
      }

      if (val!.length > 3) {
        this.amountRef.nativeElement.value = val!.substring(0, val!.length - 1);
        return;
      }

      if (!this.PATTERN.test(val!)) {
        this.amountRef.nativeElement.value = val!.substring(0, val!.length - 1);
      } else {
        this.amountV = Number.parseInt(this.amountRef.nativeElement.value);
      }

      this.amount.setValue(this.amountV.toString(), {emitEvent: false});
    });

    this.description.valueChanges.subscribe((val) => {
      this.descriptionV = val;
    });
  }

  canSubmit(): boolean {
    return !this.name.hasError('required');
  }

  confirm(): void {
    const item = new Item({
      "name": this.nameV,
      "count": this.amountV,
      "description": this.descriptionV
    });
    setTimeout(() => this.ref.close(item), 100);
  }

  cancel(): void {
    setTimeout(() => this.ref.close(null), 100);
  }
}

import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/domain/item';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';

@Component({
  selector: 'app-list-dialog-item',
  templateUrl: './list-dialog-item.component.html',
  styleUrls: ['./list-dialog-item.component.less']
})
export class ListDialogItemComponent extends AbstractListDialog<Item> implements OnInit {
  @ViewChild('amountInput') amountRef: any;

  group: FormGroup;
  name: FormControl;
  amount: FormControl;
  description: FormControl;

  readonly PATTERN = /^[0-9]+$/;

  nameV: string = '';
  amountV: number = 1;
  descriptionV: string = '';

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Item>
  ) { 
    super(ref, data);

    this.name = fb.control('', [Validators.required]);
    this.amount = fb.control('1', [Validators.required]);
    this.description = fb.control<string>('');

    this.group = fb.group({
      'name': this.name,
      'amount': this.amount,
      'description': this.description,
    });

    this.amount.setValue('1');
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.amount.valueChanges.subscribe((val) => {
      if (this.amountRef !== undefined) {
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
      }
    });

    this.description.valueChanges.subscribe((val) => {
      this.descriptionV = val;
    });

    this.loadEdit();
  }

  override canSubmit(): boolean {
    return !this.name.hasError('required');
  }

  override createListType(): Item {
    return new Item({
      "name": this.nameV,
      "count": this.amountV,
      "description": this.descriptionV
    });
  }

  override setValues(): void {
    console.log(this.val);
    this.name.setValue(this.val!.name);
    this.amount.setValue(this.val!.count);
    this.description.setValue(this.val!.description);
  }
}

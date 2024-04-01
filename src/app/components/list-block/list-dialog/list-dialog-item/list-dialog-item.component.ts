import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item, AmmunitionType, ammunitionTypes } from 'src/app/domain/item';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';

@Component({
  selector: 'app-list-dialog-item',
  templateUrl: './list-dialog-item.component.html',
  styleUrls: ['./list-dialog-item.component.less']
})
export class ListDialogItemComponent extends AbstractListDialog<Item> implements OnInit {
  @ViewChild('amountInput') amountRef!: ElementRef;

  group: FormGroup;
  name: FormControl;
  // amount: FormControl;
  description: FormControl;
  isAmmunition: FormControl;
  ammunitionType: FormControl;

  readonly PATTERN = /^[0-9]+$/;
  readonly AMMUNITION_TYPES = ammunitionTypes;

  nameV: string = '';
  amountV: number = 1;
  descriptionV: string = '';
  isAmmunitionV: boolean = false;
  ammunitionTypeV: AmmunitionType = 'bullet';

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Item>
  ) {
    super(ref, data);

    this.name = fb.control('', [Validators.required]);
    // this.amount = fb.control('1', [Validators.required]);
    this.description = fb.control<string>('');
    this.isAmmunition = fb.control<boolean>(false);
    this.ammunitionType = fb.control('bullet');

    this.group = fb.group({
      'name': this.name,
      // 'amount': this.amount,
      'description': this.description,
      'isAmmunition': this.isAmmunition,
      'ammunitionType': this.ammunitionType,
    });

    // this.amount.setValue('1');
    this.isAmmunition.setValue(false);
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.description.valueChanges.subscribe((val) => {
      this.descriptionV = val;
    });

    this.isAmmunition.valueChanges.subscribe((val) => {
      this.isAmmunitionV = val;
    });

    this.ammunitionType.valueChanges.subscribe((val) => {
      this.ammunitionTypeV = val;
    });

    this.loadEdit();
  }

  override canSubmit(): boolean {
    return !this.name.hasError('required');
  }

  override createListType(): Item {
    const item = new Item({
      'name': this.nameV,
      'count': this.amountV,
      'description': this.descriptionV,
    });

    if (this.isAmmunitionV) {
      item.ammunitionType = this.ammunitionTypeV;
    }

    return item;
  }

  override setValues(): void {
    this.name.setValue(this.val!.name);
    this.amountV = this.val!.count;
    this.description.setValue(this.val!.description);
    if (this.val!.ammunitionType !== undefined) {
      this.isAmmunition.setValue(true);
      this.ammunitionType.setValue(this.val!.ammunitionType!);
    }
  }

  updateAmount(a: string) {
    console.log(a);
    this.amountV = Number.parseInt(a);
  }
}

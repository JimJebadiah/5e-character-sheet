import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';
import { Ability, AbilityJSON, Recharge } from 'src/app/domain/ability';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attributes, attributes } from 'src/app/domain/attribute';

@Component({
  selector: 'app-list-dialog-ability',
  templateUrl: './list-dialog-ability.component.html',
  styleUrls: ['./list-dialog-ability.component.less']
})
export class ListDialogAbilityComponent extends AbstractListDialog<Ability> implements OnInit {
  @ViewChild('chargeInput') amountRef!: ElementRef;

  readonly PATTERN = /^[0-9]+$/;

  attributes = [...attributes, 'proficiency'];

  group: FormGroup;
  name: FormControl;
  description: FormControl;
  attribute: FormControl;
  reachargeOn: FormControl;

  nameV: string = '';
  chargeV: number = 0;
  descriptionV: string = '';
  attributeV: string = 'none';
  rechargeOnV: Recharge = 'short';

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogAbilityComponent>,
  @Inject(MAT_DIALOG_DATA) data: DialogData<Ability>
  ) {
    super(ref, data);

    this.name = fb.control('', [Validators.required]);
    this.description = fb.control('');
    this.attribute = fb.control('');
    this.reachargeOn = fb.control('');

    this.group = fb.group({
      'name': this.name,
      'description': this.description,
      'attribute': this.attribute,
      'rechargeOn': this.reachargeOn
    });

    this.attribute.setValue('none');
    this.reachargeOn.setValue('short');
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.description.valueChanges.subscribe((val) => {
      this.descriptionV = val;
    });

    this.attribute.valueChanges.subscribe((val) => {
      this.attributeV = val;
    });

    this.reachargeOn.valueChanges.subscribe((val) => {
      this.rechargeOnV = val;
    });

    this.loadEdit();
  }

  override canSubmit(): boolean {
    return !this.name.hasError('required');
  }

  override createListType(): Ability {
    const a: AbilityJSON = {
      name: this.nameV,
      description: this.descriptionV,
      charges: Number.MAX_SAFE_INTEGER,
      chargeModifier: this.chargeV,
      rechargeOn: this.rechargeOnV,
    };

    if (this.attributeV !== 'none') {
      a.attribute = this.attributeV as (Attributes | 'proficiency' | undefined);
    }

    return new Ability(a);
  }

  override setValues(): void {
    this.name.setValue(this.val!.name);
    console.log(this.val!.chargeModifier);
    this.chargeV = this.val!.chargeModifier;
    this.description.setValue(this.val!.description);
    this.attribute.setValue(this.val!.attribute ?? 'none');
    this.reachargeOn.setValue(this.val!.rechargeOn);
  }

  updateCharge(a: string) {
    this.chargeV = Number.parseInt(a);
  }
}

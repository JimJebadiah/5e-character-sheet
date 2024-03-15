import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('chargeInput') amountRef: any;

  readonly PATTERN = /^[0-9]+$/;

  attributes = [...attributes, 'proficiency'];

  group: FormGroup;
  name: FormControl;
  description: FormControl;
  charges: FormControl;
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
    this.charges = fb.control('1', [Validators.required]);
    this.description = fb.control('');
    this.attribute = fb.control('');
    this.reachargeOn = fb.control('');

    this.group = fb.group({
      'name': this.name,
      'charges': this.charges,
      'description': this.description,
      'attribute': this.attribute,
      'rechargeOn': this.reachargeOn
    });

    this.charges.setValue('0');
    this.attribute.setValue('none');
    this.reachargeOn.setValue('short');
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.charges.valueChanges.subscribe((val) => {
      if (this.amountRef !== undefined) {
        if (val! === '') {
          this.chargeV = 0;
          this.amountRef.nativeElement.value = '';
          return;
        }

        if (val! === '0') {
          this.chargeV = 1;
          this.amountRef.nativeElement.value = '1';
        }

        if (val!.length > 3) {
          this.amountRef.nativeElement.value = val!.substring(0, val!.length - 1);
          return;
        }

        if (!this.PATTERN.test(val!)) {
          this.amountRef.nativeElement.value = val!.substring(0, val!.length - 1);
        } else {
          this.chargeV = Number.parseInt(this.amountRef.nativeElement.value);
        }

        this.charges.setValue(this.chargeV.toString(), {emitEvent: false});
      }
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
    return !this.name.hasError('required') && !this.charges.hasError('required');
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
    this.charges.setValue(this.val!.chargeModifier);
    this.description.setValue(this.val!.description)
    this.attribute.setValue(this.val!.attribute ?? 'none');
    this.reachargeOn.setValue(this.val!.rechargeOn);
  }
}

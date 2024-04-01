import { Component, Inject, OnInit } from '@angular/core';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';
import { DamageType, Firearm, MeleeWeapon, RangeWeapon, Weapon } from 'src/app/domain/weapon';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dice } from 'src/app/domain/dice';
import { Attributes, attributes } from 'src/app/domain/attribute';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-list-dialog-weapon',
  templateUrl: './list-dialog-weapon.component.html',
  styleUrl: './list-dialog-weapon.component.less'
})
export class ListDialogWeaponComponent extends AbstractListDialog<Weapon> implements OnInit {

  attributes = attributes;
  damage: DamageType[] = ['bludgeoning', 'piercing', 'slashing'];
  dice: Dice[] = [
    'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'
  ];

  // Group
  group: FormGroup;

  // Form controls
  name: FormControl;
  description: FormControl;
  damageDice: FormControl;
  proficient: FormControl;
  damageType: FormControl;
  attribute: FormControl;

  // Values
  nameV: string = '';
  descriptionV: string ='';
  damageDiceV: Dice = 'd4';
  damageDiceAmountV: number = 1;
  damageModifiersV: number[] = [];
  proficientV: boolean = false;
  damageTypeV: DamageType = 'bludgeoning';
  modifiersV: number[] = [];
  attributeV: Attributes = Attributes.STR;
  rangeV: number = 1;
  maxRangeV: number = 1;
  roundsV: number = 1;
  misfireScoreV: number = 1;

  weaponIndex: number = 0;
  weaponTypes: string[] = ['melee', 'ranged', 'firearm'];

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogWeaponComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Weapon>
  ) {
    super(ref, data);

    this.name = fb.control('');
    this.description = fb.control('');
    this.damageDice = fb.control('');
    this.proficient = fb.control('');
    this.damageType = fb.control('');
    this.attribute = fb.control('');

    this.group = fb.group({
      'name': this.name,
      'description': this.description,
      'damageDice': this.damageDice,
      'proficient': this.proficient,
      'damageType': this.damageType,
      'attribute': this.attribute,
    });
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => this.nameV = v);
    this.description.valueChanges.subscribe((v) => this.descriptionV = v);
    this.damageDice.valueChanges.subscribe((v) => this.damageDiceV = v);
    this.proficient.valueChanges.subscribe((v) => this.proficientV = v);
    this.damageType.valueChanges.subscribe((v) => this.damageTypeV = v);
    this.attribute.valueChanges.subscribe((v) => this.attributeV = v);

    if (this.val instanceof MeleeWeapon) this.weaponIndex = 0;
    else if (this.val instanceof Firearm) this.weaponIndex = 2;
    else if (this.val instanceof RangeWeapon) this.weaponIndex = 1;

    this.loadEdit();
  }

  override canSubmit(): boolean {
    return false;
  }

  override createListType(): Weapon {
    console.log(this.weaponIndex);
    switch (this.weaponIndex) {
    case 0:
      return this.createMeleeWeapon();
    case 1:
      return this.createRangeWeapon();
    case 2:
      return this.createFirearmWeapon();
    default:
      return this.createMeleeWeapon();
    }
  }

  override setValues(): void {
    this.name.setValue(this.val!.name);
    this.description.setValue(this.val!.description);
    this.damageDice.setValue(this.val!.damageDice);
    this.proficient.setValue(this.val!.proficient);

    console.log(this.val!.damageType);
    this.damageType.setValue(this.val!.damageType);
    this.attribute.setValue(this.val!.getAttribute());

    this.damageModifiersV = this.val!.damageModifiers;
    this.modifiersV = this.val!.modifiers;

    this.damageDiceAmountV = this.val!.damageDiceAmount;

    if (this.val! instanceof RangeWeapon) {
      const range = this.val! as RangeWeapon;
      this.rangeV = range.range;
      this.maxRangeV = range.maxRange;
    }

    if (this.val! instanceof Firearm) {
      const firearm = this.val! as Firearm;
      this.roundsV = firearm.rounds;
      this.misfireScoreV = firearm.misfireScore;
    }
  }

  isFirearm() {
    return this.val instanceof Firearm;
  }

  updateWeaponType(index: number) {
    this.weaponIndex = index;
  }

  updateDamageDiceAmount(a: string) {
    this.damageDiceAmountV = Number.parseInt(a);
  }

  updateRange(a: string) {
    this.rangeV = Number.parseInt(a);
  }

  updateMaxRange(a: string) {
    this.maxRangeV = Number.parseInt(a);
  }

  updateRounds(a: string) {
    this.roundsV = Number.parseInt(a);
  }

  updateMisfireScore(a: string) {
    this.misfireScoreV = Number.parseInt(a);
  }

  addDamageModifier(event: MatChipInputEvent) {
    const modifier = event.value.trim();

    if (!Number.isNaN(Number.parseInt(modifier))) {
      this.damageModifiersV.push(Number.parseInt(modifier));
    }

    event.chipInput!.clear();
  }

  removeDamageModifier(modifier: number) {
    console.log(this.damageModifiersV);
    const index = this.damageModifiersV.indexOf(modifier);

    if (index >= 0) {
      this.damageModifiersV.splice(index, 1);
    }
  }

  addAttackModifier(event: MatChipInputEvent) {
    const modifier = event.value.trim();

    if (!Number.isNaN(Number.parseInt(modifier))) {
      this.modifiersV.push(Number.parseInt(modifier));
    }

    event.chipInput!.clear();
  }

  removeAttackModifier(modifier: number) {
    const index = this.modifiersV.indexOf(modifier);

    if (index >= 0) {
      this.modifiersV.splice(index, 1);
    }
  }

  private createMeleeWeapon(): Weapon {
    return new MeleeWeapon({
      id: this.val?.id ?? uuidv4(),
      name: this.nameV,
      description: this.descriptionV,
      damageDice: this.damageDiceV,
      damageDiceAmount: this.damageDiceAmountV,
      damageModifiers: this.damageModifiersV,
      proficient: this.proficientV,
      damageType: this.damageTypeV,
      modifiers: this.modifiersV,
      attribute: this.attributeV,
      type: 'melee'
    });
  }

  private createRangeWeapon(): Weapon {
    return new RangeWeapon({
      ...this.createMeleeWeapon(),
      type: 'ranged',
      rangeType: 'standard',
      range: this.rangeV,
      maxRange: this.maxRangeV
    });
  }

  private createFirearmWeapon(): Weapon {
    return new Firearm({
      ...this.createRangeWeapon(),
      status: (this.val as Firearm)?.status ?? 'operational',
      misfireScore: this.misfireScoreV,
      rounds: this.roundsV,
      loaded: (this.val as Firearm)?.loaded ?? 0,
      type: 'ranged'
    });
  }
}

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

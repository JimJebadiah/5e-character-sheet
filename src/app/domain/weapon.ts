import { ListType } from '../components/list-block/list-data/list-type';
import { Attributes, attributes } from './attribute';
import { Dice } from './dice';
import { Hero } from './hero';

type WeaponType = 'melee' | 'ranged';
type RangeType = 'standard' | 'firearm';
export type DamageType = 'piercing' | 'slashing' | 'bludgeoning';
type FirearmStatus = 'operational' | 'jammed' | 'broken';

export interface WeaponJSON {
    // Global
    id: string,
    name: string,
    description: string,
    damageDice: Dice,
    damageDiceAmount: number,
    damageModifiers: number[];
    proficient: boolean,
    damageType: DamageType,
    modifiers: number[],
    type: WeaponType,
    attribute?: string,

    // Range
    range?: number;
    maxRange?: number;
    rangeType?: RangeType;
    hasAmmo?: boolean;

    // Firearm
    rounds?: number;
    loaded?: number;
    misfireScore?: number;
    status?: FirearmStatus;
}

export function makeWeapon(json: WeaponJSON): Weapon {
  let weapon: Weapon;
  switch (json.type) {
  case 'melee':
    weapon = new MeleeWeapon(json);
    break;
  case 'ranged':
    weapon = json.rangeType! === 'firearm' ? new Firearm(json) : new RangeWeapon(json);
  }
  return weapon;
}

export class Weapon extends ListType {
  id: string;
  name: string;
  description: string;
  damageDice: Dice;
  damageDiceAmount: number;
  damageModifiers: number[];
  proficient: boolean;
  damageType: DamageType;
  modifiers: number[];
  attribute?: Attributes;

  constructor(json: WeaponJSON) {
    super();
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.damageDice = json.damageDice;
    this.damageDiceAmount = json.damageDiceAmount;
    this.damageModifiers = json.damageModifiers;
    this.proficient = json.proficient;
    this.damageType = json.damageType;
    this.modifiers = json.modifiers;
    this.attribute = attributes.find((a) => a === json.attribute);
  }

  attackRole: string = '';
  setAttackRole(hero: Hero) {
    let modifer = hero.getAttrMod(this.getAttribute());
    this.modifiers.forEach((val) => modifer += val);
    if (this.proficient) modifer += hero.getProfBonus();

    this.attackRole = `d20 + ${modifer}`;
  }

  damageRole: string = '';
  setDamageRole(hero: Hero) {
    let modifer = hero.getAttrMod(this.getAttribute());
    this.damageModifiers.forEach((val) => modifer += val);
    this.damageRole = `${this.damageDiceAmount}${this.damageDice} + ${modifer} ${this.damageType}`;
  }

  getAttribute(): Attributes {
    return Attributes.STR;
  }

  type(): WeaponType {
    return 'melee';
  }

  get json(): WeaponJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      damageDice: this.damageDice,
      damageDiceAmount: this.damageDiceAmount,
      damageModifiers: this.damageModifiers,
      proficient: this.proficient,
      damageType: this.damageType,
      modifiers: this.modifiers,
      attribute: this.getAttribute(),
      type: this.type()
    };
  }
}

export class MeleeWeapon extends Weapon {
  override getAttribute(): Attributes {
    return this.attribute ?? Attributes.STR;
  }

  override type(): WeaponType {
    return 'melee';
  }
}

export class RangeWeapon extends Weapon {
  range: number;
  maxRange: number;
  hasAmmo: boolean;

  constructor(json: WeaponJSON) {
    super(json);
    this.range = json.range!;
    this.maxRange = json.maxRange!;
    this.hasAmmo = json.hasAmmo!;
  }

  override getAttribute(): Attributes {
    return this.attribute ?? Attributes.DEX;
  }

  override type(): WeaponType {
    return 'ranged';
  }

  rangeType(): RangeType {
    return 'standard';
  }


  override get json(): WeaponJSON {
    return {
      ...super.json,
      range: this.range,
      maxRange: this.maxRange,
      rangeType: this.rangeType(),
      hasAmmo: this.hasAmmo
    };
  }
}

export class Firearm extends RangeWeapon {
  rounds: number;
  loaded: number;
  misfireScore: number;
  status: FirearmStatus;

  constructor(json: WeaponJSON) {
    super(json);
    this.rounds = json.rounds!;
    this.loaded = json.loaded!;
    this.misfireScore = json.misfireScore!;
    this.status = json.status!;
  }

  override rangeType(): RangeType {
    return 'firearm';
  }

  canFire() {
    return this.status === 'operational' && this.loaded > 0;
  }

  canReload() {
    return this.loaded < this.rounds;
  }

  misfire() {
    this.status = 'jammed';
  }

  break() {
    this.status = 'broken';
  }

  repair() {
    this.status = 'operational';
  }

  reload(amt: number): number {
    let overage = 0;

    if (amt > this.rounds - this.loaded) {
      overage = amt - (this.rounds - this.loaded);
      this.loaded = this.rounds;
    } else {
      this.loaded += amt;
    }

    return overage;
  }

  fire() {
    if (this.canFire()) {
      this.loaded--;
    }
  }

  override get json(): WeaponJSON {
    return {
      ...super.json,
      rounds: this.rounds,
      loaded: this.loaded,
      status: this.status,
      misfireScore: this.misfireScore
    };
  }
}

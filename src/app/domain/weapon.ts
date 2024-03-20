import { Attributes, attributes } from './attribute';
import { Dice } from './dice';
import { Hero } from './hero';

type WeaponType = 'melee' | 'ranged';
type RangeType = 'standard' | 'firearm';
type DamageType = 'piercing' | 'slashing' | 'bludgeoning';
type FirearmStatus = 'operational' | 'jammed' | 'broken';

export interface WeaponJSON {
    // Global
    name: string,
    damageDice: Dice,
    damageDiceAmount: number,
    damageModifiers: number[],
    proficient: boolean,
    damageType: DamageType,
    modifiers: number[],
    type: WeaponType,
    attribute?: string,

    // Range
    range?: number;
    maxRange?: number;
    rangeType?: RangeType;

    // Firearm
    rounds?: number;
    loaded?: number;
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

export abstract class Weapon {
  name: string;
  damageDice: Dice;
  damageDiceAmount: number;
  damageModifiers: number[];
  proficient: boolean;
  damageType: DamageType;
  modifiers: number[];
  attribute?: Attributes;

  constructor(json: WeaponJSON) {
    this.name = json.name;
    this.damageDice = json.damageDice;
    this.damageDiceAmount = json.damageDiceAmount;
    this.damageModifiers = json.damageModifiers;
    this.proficient = json.proficient;
    this.damageType = json.damageType;
    this.modifiers = json.modifiers;
    this.attribute = attributes.find((a) => a === json.attribute);
  }

  attackRole(hero: Hero): string {
    let modifer = hero.getAttrMod(this.getAttribute());
    this.modifiers.forEach((val) => modifer += val);
    if (this.proficient) modifer += hero.getProfBonus();

    return `d20 + ${modifer}`;
  }

  damageRole(hero: Hero): string {
    let modifer = hero.getAttrMod(this.getAttribute());
    this.damageModifiers.forEach((val) => modifer += val);
    return `${this.damageDiceAmount}${this.damageDice} + ${modifer} ${this.damageType}`;
  }

    abstract getAttribute(): Attributes;

    abstract type(): WeaponType;

    get json(): WeaponJSON {
      return {
        name: this.name,
        damageDice: this.damageDice,
        damageDiceAmount: this.damageDiceAmount,
        damageModifiers: this.damageModifiers,
        proficient: this.proficient,
        damageType: this.damageType,
        modifiers: this.modifiers,
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

  constructor(json: WeaponJSON) {
    super(json);
    this.range = json.range!;
    this.maxRange = json.maxRange!;
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
      rangeType: this.rangeType()
    };
  }
}

export class Firearm extends RangeWeapon {
  rounds: number;
  loaded: number;
  status: FirearmStatus;

  constructor(json: WeaponJSON) {
    super(json);
    this.rounds = json.rounds!;
    this.loaded = json.loaded!;
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
    };
  }
}

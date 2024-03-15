import { ListType } from "../components/list-block/list-data/list-type";
import { Attributes, attributes } from "./attribute";
import { Hero } from "./hero";

export type Recharge = 'short' | 'long';

export interface AbilityJSON {
  name: string,
  description: string,
  charges: number,
  chargeModifier: number,
  rechargeOn: Recharge,
  attribute?: string,
}

export class Ability extends ListType {
  name: string;
  description: string;
  charges: number;
  chargeModifier: number;
  rechargeOn: Recharge;
  attribute?: Attributes | 'proficiency';
  maxCharge: number = 0;

  constructor(json: AbilityJSON) {
    super();
    this.name = json.name;
    this.description = json.description;
    this.charges = json.charges;
    this.chargeModifier = json.chargeModifier ?? 0;
    this.rechargeOn = json.rechargeOn;

    if (json.attribute !== undefined) {
      this.attribute = attributes.find((a) => a === json.attribute!);
    }
  }

  setMaxCharge(hero: Hero): void {
    this.maxCharge = 0;
    if (this.attribute !== undefined) {
      if (this.attribute === 'proficiency') {
        const p = hero.getProfBonus();
        this.maxCharge += p;
      } else {
        const a = hero.getAttrMod(this.attribute! as Attributes);
        this.maxCharge += a;
      }
    }

    this.maxCharge += this.chargeModifier;

    if (this.charges > this.maxCharge) this.charges = this.maxCharge;
  }

  canUse(): boolean {
    return this.charges > 0;
  }

  use(): void {
    if (this.canUse()) {
        this.charges--;
    }
  }

  recharge(amount: number): void {
    this.charges += amount;
    if (this.charges > this.maxCharge) this.charges = this.maxCharge;
  }

  get json(): AbilityJSON {
    const json = {
      name: this.name,
      description: this.description,
      charges: this.charges,
      chargeModifier: this.chargeModifier,
      rechargeOn: this.rechargeOn
    };

    if (this.attribute !== undefined) {
      (json as any)['attribute'] = this.attribute;
    }

    return json;
  }
}
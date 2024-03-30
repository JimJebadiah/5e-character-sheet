/* eslint-disable @typescript-eslint/no-explicit-any */
import { Getter, Setter } from '../directives/editable-number/editable-number.directive';
import { Ability, AbilityJSON } from './ability';
import { AttributeJSON, Attributes, Attribute, attributes } from './attribute';
import { Dice } from './dice';
import { Feat, FeatJSON } from './feat';
import { Item, ItemJSON } from './item';
import { Skill, Skills, skills } from './skill';
import { SpellLevel, SpellLevelJSON, makeSpellLevels } from './spell-level';
import { Weapon, WeaponJSON, makeWeapon } from './weapon';

export interface HeroJSON {
    name: string,
    class: string,
    level: number,
    race: string,
    maxHp: number,
    hp: number,
    tempHp: number,
    ac: number,
    speed: number,
    deathSaves: number[][],
    hitDice: Dice,
    hitDiceCount: number,
    background: string,
    alignment: string,
    inspiration: boolean,
    proficiencyBonus: number,
    attributes: AttributeJSON[],
    proficientSkills?: string[],
    inventory: ItemJSON[],
    weapons: WeaponJSON[],
    languages: string[],
    feats: FeatJSON[],
    abilities: AbilityJSON[],
    currency: number[],
    blockOrder: number[],
    spellLevels?: SpellLevelJSON[],
}

export class Hero {
  name: string;
  class: string;
  level: number;
  race: string;
  maxHp: number;
  hp: number;
  tempHp: number;
  ac: number;
  speed: number;
  deathSaves: number[][];
  hitDice: Dice;
  hitDiceCount: number;
  background: string;
  alignment: string;
  inspiration: boolean;
  proficiencyBonus: number;
  attributes: Map<Attributes, Attribute>;
  skills: Map<Skills, Skill>;
  inventory: Item[];
  weapons: Weapon[];
  languages: string[];
  feats: Feat[];
  abilities: Ability[];
  currency: Map<string, number>;
  spellLevels?: SpellLevel[];
  blockOrder: number[];

  constructor (json: HeroJSON) {
    this.name = json.name;
    this.class = json.class;
    this.level = json.level;
    this.race = json.race;
    this.maxHp = json.maxHp;
    this.hp = json.hp;
    this.tempHp = json.tempHp;
    this.ac = json.ac;
    this.speed = json.speed;
    this.deathSaves = json.deathSaves;
    this.hitDice = json.hitDice;
    this.hitDiceCount = json.hitDiceCount;
    this.background = json.background;
    this.alignment = json.alignment;
    this.inspiration = json.inspiration;
    this.proficiencyBonus = json.proficiencyBonus;
    this.inventory = json.inventory?.map((i) => new Item(i)) ?? [];
    this.weapons = json.weapons?.map((w) => makeWeapon(w)) ?? [];
    this.languages = json.languages;
    this.feats = json.feats?.map((f) => new Feat(f)) ?? [];
    this.abilities = json.abilities?.map((a) => new Ability(a)) ?? [];
    this.blockOrder = json.blockOrder ?? [0, 1, 2, 3];

    this.attributes = new Map<Attributes, Attribute>();
    let i = 0;
    json.attributes.forEach(() => {
      const attr = attributes[i];
      this.attributes.set(attr, new Attribute(json.attributes.filter((a) => a.name === attr)[0]));
      i++;
    });

    this.skills = new Map<Skills, Skill>();
    const skillArray = json.proficientSkills ?? [];
    i = 0;
    skills.forEach((s) => {
      const proficient = skillArray.includes(s.skill);
      const skill = new Skill(s, proficient);
      this.skills.set(s.skill, skill);
    });

    this.currency = new Map<string, number>();
    const keys = ['Platinum', 'Gold', 'Electrum', 'Silver', 'Copper'];
    const currencyArray = json.currency ?? [0, 0, 0, 0, 0];
    keys.forEach((k, index) => {
      this.currency.set(k, currencyArray[index]);
    });

    this.abilities.forEach((a) => a.setMaxCharge(this));

    this.spellLevels = json.spellLevels?.map((s) => new SpellLevel(s));

    this.weapons.forEach((w) => {
      w.setAttackRole(this);
      w.setDamageRole(this);
    });
  }

  getAttrMod(attribute: Attributes): number {
    return this.attributes.get(attribute)!.modifier ;
  }

  getProfBonus() {
    return this.proficiencyBonus;
  }

  damage(): Setter<number> {
    return (amnt) => {
      if (this.tempHp > 0) {
        this.tempHp -= amnt;

        if (this.tempHp < 0) {
          this.hp += this.tempHp;
          this.tempHp = 0;
        }
      } else {
        this.hp -= amnt;
      }
      if (this.hp < 0) this.hp = 0;
    };
  }

  recover(amnt: number) {
    this.hp += amnt;
    if (this.hp > this.maxHp) this.hp = this.maxHp;
  }

  longRest() {
    this.hp = this.maxHp;
    this.hitDiceCount = this.level;
    this.abilities.filter((a) => a.rechargeOn === 'long' || a.rechargeOn === 'short')
      .forEach((a) => a.recharge(a.maxCharge));
  }

  shortRest(hitDice: number, hpRecovered: number) {
    this.hp += hpRecovered;
    this.hitDiceCount - hitDice;
    if (this.hp > this.maxHp) this.hp = this.maxHp;
    if (this.hitDiceCount < 0) this.hitDiceCount = 0;
  }

  get json() {
    return {
      name: this.name,
      class: this.class,
      level: this.level,
      race: this.race,
      maxHp: this.maxHp,
      hp: this.hp,
      tempHp: this.tempHp,
      ac: this.ac,
      speed: this.speed,
      deathSaves: this.deathSaves,
      hitDice: this.hitDice,
      hitDiceCount: this.hitDiceCount,
      background: this.background,
      alignment: this.alignment,
      inspiration: this.inspiration,
      proficiencyBonus: this.proficiencyBonus,
      proficientSkills: [...this.skills.values()].filter((s) => s.proficient).map((s) => s.skill.skill),
      inventory: this.inventory.map((i) => i.json),
      weapons: this.weapons.map((w) => w.json),
      feats: this.feats.map((f) => f.json),
      languages: this.languages,
      abilities: this.abilities.map((a) => a.json),
      attributes: [ ...this.attributes.values() ].map((v) => v.json),
      currency: [...this.currency.values()],
      spellLevels: makeSpellLevels(),
      blockOrder: [...this.blockOrder],
    };
  }

  static empty(name: string) {
    return new Hero({
      name: name,
      class: '',
      level: 0,
      race: '',
      maxHp: 0,
      hp: 0,
      tempHp: 0,
      ac: 0,
      speed: 0,
      deathSaves: [[]],
      hitDice: 'd10',
      hitDiceCount: 0,
      background: '',
      alignment: '',
      inspiration: false,
      proficiencyBonus: 0,
      proficientSkills: [],
      inventory: [],
      weapons: [],
      feats: [],
      languages: [],
      abilities: [],
      attributes: [],
      currency: [0, 0, 0, 0, 0],
      spellLevels: makeSpellLevels(),
      blockOrder: [0, 1, 2, 3]
    });
  }


  getNumber(field: keyof Hero): Getter<number> {
    const val = (this as any)[field] as number;
    return () => val;
  }

  setNumber(field: keyof Hero): Setter<number> {
    return (val: number) => (this as any)[field] = val;
  }

  getString(field: keyof Hero): Getter<string> {
    const val = (this as any)[field] as string;
    return () => val;
  }

  setString(field: keyof Hero): Setter<string> {
    return (val: string) => (this as any)[field] = val;
  }
}

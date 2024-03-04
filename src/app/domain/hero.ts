import { Ability, AbilityJSON } from "./ability";
import { AttributeJSON, Attributes, Attribute } from "./attribute";
import { Dice } from "./dice";
import { Feat, FeatJSON } from "./feat";
import { Item, ItemJSON } from "./item";
import { Skill, SkillJSON } from "./skill";
import { Weapon, WeaponJSON, makeWeapon } from "./weapon";

export interface HeroJSON {
    name: string,
    class: string,
    level: number,
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
    skills: SkillJSON[],
    inventory: ItemJSON[],
    weapons: WeaponJSON[],
    languages: string[],
    feats: FeatJSON[],
    abilities: AbilityJSON[]
}

export class Hero {
    name: string;
    class: string;
    level: number;
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
    skills: Skill[];
    inventory: Item[];
    weapons: Weapon[];
    languages: string[];
    feats: Feat[];
    abilities: Ability[];


    constructor (json: HeroJSON) {
        this.name = json.name;
        this.class = json.class;
        this.level = json.level;
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
        this.skills = json.skills?.map((s) => new Skill(s)) ?? [];
        this.inventory = json.inventory?.map((i) => new Item(i)) ?? [];
        this.weapons = json.weapons?.map((w) => makeWeapon(w)) ?? [];
        this.languages = json.languages;
        this.feats = json.feats?.map((f) => new Feat(f)) ?? [];
        this.abilities = json.abilities?.map((a) => new Ability(a)) ?? [];

        this.attributes = new Map<Attributes, Attribute>();
        if (json.attributes.length >= 6) {
            this.attributes.set(Attributes.STR, new Attribute(json.attributes.filter((a) => a.name === Attributes.STR)[0]));
            this.attributes.set(Attributes.DEX, new Attribute(json.attributes.filter((a) => a.name === Attributes.DEX)[0]));
            this.attributes.set(Attributes.CON, new Attribute(json.attributes.filter((a) => a.name === Attributes.CON)[0]));
            this.attributes.set(Attributes.INT, new Attribute(json.attributes.filter((a) => a.name === Attributes.INT)[0]));
            this.attributes.set(Attributes.WIS, new Attribute(json.attributes.filter((a) => a.name === Attributes.WIS)[0]));
            this.attributes.set(Attributes.CHA, new Attribute(json.attributes.filter((a) => a.name === Attributes.CHA)[0]));
        }
    }

    getAttrMod(attribute: Attributes): number {
        return this.attributes.get(attribute)!.modifier ;
    }

    getProfBonus() {
        return 0;
    }

    damage(amnt: number) {
        if (this.tempHp > 0) {
            this.tempHp -= amnt;

            if (this.tempHp < 0) {
                this.hp += this.tempHp;
            }
        } else {
            this.hp -= amnt;
        }
        if (this.hp < 0) this.hp = 0;
    }

    recover(amnt: number) {
        this.hp += amnt;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    longRest() {
        this.hp = this.maxHp;
        this.hitDiceCount = this.level;
        this.abilities.filter((a) => a.rechargeOn === 'long' || a.rechargeOn === 'short')
            .forEach((a) => a.recharge());
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
            skills: this.skills.map((s) => s.json),
            inventory: this.inventory.map((i) => i.json),
            weapons: this.weapons.map((w) => w.json),
            feats: this.feats.map((f) => f.json),
            languages: this.languages,
            abilities: this.abilities.map((a) => a.json),
            attributes: [ ...this.attributes.values() ].map((v) => v.json)
        };
    }

    static empty(name: string) {
        return new Hero({
            name: name,
            class: '',
            level: 0,
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
            skills: [],
            inventory: [],
            weapons: [],
            feats: [],
            languages: [],
            abilities: [],
            attributes: []
        });
    }
}
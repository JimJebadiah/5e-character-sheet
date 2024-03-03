import { Attributes } from "./attribute";
import { Hero } from "./hero";

export enum SKILLS {
    ACROBATICS = 'acrobatics',
    ANIMAL_HANDLING = 'animal handling',
    ARCANA = 'arcana',
    ATHLETICS = 'athletics',
    DECEPTION = 'deception',
    HISTORY = 'history',
    INSIGHT = 'insight',
    INTIMIDATION = 'intimidation',
    INVESTIGATION = 'investigation',
    MEDICINE = 'medicine',
    NATURE = 'nature',
    PERCEPTION = 'perception',
    PERFORMANCE = 'performance',
    PERSUASION = 'persuasion',
    RELIGION = 'religion',
    SLEIGHT_OF_HAND = 'sleight of hand',
    STEALTH = 'stealth'
}

export interface SkillJSON {
    readonly name: string,
    readonly attribute: string,
    proficient: boolean,
}

export class Skill {
    readonly name: string;
    readonly attribute: Attributes;
    proficient: boolean;
    
    constructor(json: SkillJSON) {
        this.name = json.name;
        this.attribute = json.attribute as Attributes;
        this.proficient = json.proficient;
    }

    getModifier(hero: Hero): number {
        let base = hero.getAttrMod(this.attribute);
        if (this.proficient) base += hero.getProfBonus();
        return base;
    }

    get json(): SkillJSON {
        return {
            name: this.name,
            attribute: this.attribute,
            proficient: this.proficient
        }
    }
}
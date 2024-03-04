import { Attributes, attributes } from "./attribute";
import { Hero } from "./hero";

export enum Skills {
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
    STEALTH = 'stealth',
    SURVIVAL = 'survival',
}

export const skills = [
  Skills.ACROBATICS,
  Skills.ANIMAL_HANDLING,
  Skills.ARCANA,
  Skills.ATHLETICS,
  Skills.DECEPTION,
  Skills.HISTORY,
  Skills.INSIGHT,
  Skills.INTIMIDATION,
  Skills.INVESTIGATION,
  Skills.MEDICINE,
  Skills.NATURE,
  Skills.PERCEPTION,
  Skills.PERFORMANCE,
  Skills.PERSUASION,
  Skills.RELIGION,
  Skills.SLEIGHT_OF_HAND,
  Skills.STEALTH,
  Skills.SURVIVAL,
]

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
      console.log(json.attribute + ' ' + json.name);
      this.name = json.name;
      this.attribute = attributes.find((attr) => attr === json.attribute)!;
      this.proficient = json.proficient;
    }

    getName() {
      return this.name.split(' ').map((s) => {
        return s[0].toUpperCase() + s.slice(1);
      }).join(' ');
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

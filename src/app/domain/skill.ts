import { Attributes } from './attribute';
import { Hero } from './hero';

export enum Skills {
    ACROBATICS = 'acrobatics',
    ANIMAL_HANDLING = 'animal_handling',
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
    SLEIGHT_OF_HAND = 'sleight_of_hand',
    STEALTH = 'stealth',
    SURVIVAL = 'survival',
}

export const skills = [
  {skill: Skills.ACROBATICS, attribute: Attributes.DEX},
  {skill: Skills.ANIMAL_HANDLING, attribute: Attributes.WIS},
  {skill: Skills.ARCANA, attribute: Attributes.INT},
  {skill: Skills.ATHLETICS, attribute: Attributes.STR},
  {skill: Skills.DECEPTION, attribute: Attributes.CHA},
  {skill: Skills.HISTORY, attribute: Attributes.INT},
  {skill: Skills.INSIGHT, attribute: Attributes.WIS},
  {skill: Skills.INTIMIDATION, attribute: Attributes.CHA},
  {skill: Skills.INVESTIGATION, attribute: Attributes.INT},
  {skill: Skills.MEDICINE, attribute: Attributes.WIS},
  {skill: Skills.NATURE, attribute: Attributes.INT},
  {skill: Skills.PERCEPTION, attribute: Attributes.WIS},
  {skill: Skills.PERFORMANCE, attribute: Attributes.CHA},
  {skill: Skills.PERSUASION, attribute: Attributes.CHA},
  {skill: Skills.RELIGION, attribute: Attributes.INT},
  {skill: Skills.SLEIGHT_OF_HAND, attribute: Attributes.DEX},
  {skill: Skills.STEALTH, attribute: Attributes.DEX},
  {skill: Skills.SURVIVAL, attribute: Attributes.WIS},
];

// TODO allow str mod for intimidate
export class Skill {
  skill: {skill: Skills, attribute: Attributes};
  proficient: boolean;

  constructor(
    skill: {skill: Skills, attribute: Attributes},
    proficient: boolean
  ) {
    this.skill = skill;
    this.proficient = proficient;
  }

  getName() {
    return this.skill.skill.split('_').map((s) => {
      return s[0].toUpperCase() + s.substring(1);
    }).join(' ');
  }

  getModifier(hero: Hero): number {
    let base = hero.getAttrMod(this.skill.attribute);
    if (this.proficient) base += hero.getProfBonus();
    return base;
  }
}

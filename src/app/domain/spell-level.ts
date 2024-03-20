import { Spell, SpellJSON } from "./spell";

export interface SpellLevelJSON {
  level: number;
  spellSlots: number;
  maxSpellSlots: number;
  spells: SpellJSON[];
}

export class SpellLevel {
  level: number;
  spellSlots: number;
  maxSpellSlots: number;
  spells: Spell[];

  constructor(json: SpellLevelJSON) {
    this.level = json.level;
    this.spellSlots = json.spellSlots;
    this.maxSpellSlots = json.maxSpellSlots;
    this.spells = json.spells.map((s) => new Spell(s));
  }

  get json(): SpellLevelJSON {
    return {
      level: this.level,
      spellSlots: this.spellSlots,
      maxSpellSlots: this.maxSpellSlots,
      spells: this.spells.map((s) => s.json)
    }
  }
}

export function makeSpellLevels() {
  const levels = [];
  for (let i = 0; i < 10; i++) {
    const spellLevel = new SpellLevel({
      level: i,
      spellSlots: 0,
      maxSpellSlots: 0,
      spells: []
    });
    levels.push(spellLevel);
  }
  return levels;
}

export type School = 'Abjuration' | 'Conjuration' | 'Divination' | 'Enchantment' | 'Evocation' | 'Illusion' | 'Necromancy' | 'Transmutation';
export type CastingTime = 'time' | 'action' | 'bonus-action' | 'reaction'
export type Range = 'self' | 'touch' | 'distance' | 'self-radius' | 'self-hemisphere' | 'self-line' | 'self-cone';
export type Duration = 'round' | 'time' | 'concentration' | 'instantaneous' | 'dispelled' | 'dispelled-or-triggered';

export enum Components {
  VERBAL = 'V',
  SOMATIC = 'S',
  MATERIAL = 'M'
}

export interface SpellJSON {
  name: string;
  level: number;
  description: string;
  school: string;
  castingTimeType: string;
  castingTime: number;
  rangeType: string;
  distance?: number;
  durationType: string;
  duration?: number;
  components: string[];
}

export class Spell {
  name: string;
  level: number;
  description: string;
  school: School;
  castingTimeType: CastingTime;
  castingTime: number;
  rangeType: Range;
  distance?: number;
  durationType: Duration;
  duration?: number;
  components: Components[];

  constructor(json: SpellJSON) {
    this.name = json.name;
    this.level = json.level;
    this.description = json.description;
    this.school = json.school as School;
    this.castingTimeType = json.castingTimeType as CastingTime;
    this.castingTime = json.castingTime;
    this.rangeType = json.rangeType as Range;
    this.durationType = json.durationType as Duration;
    this.components = json.components.map((c) => c as Components);

    this.distance = json.distance;
    this.duration = json.duration;
  }

  get json(): SpellJSON {
    return {
      name: this.name,
      level: this.level,
      description: this.description,
      school: this.school,
      castingTimeType: this.castingTimeType,
      castingTime: this.castingTime,
      rangeType: this.rangeType,
      distance: this.distance,
      durationType: this.durationType,
      duration: this.duration,
      components: this.components.map((c) => c.toString())
    };
  }
}

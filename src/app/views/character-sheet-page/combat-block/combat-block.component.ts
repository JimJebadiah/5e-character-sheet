import { Component, Input } from '@angular/core';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { Attributes } from 'src/app/domain/attribute';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-combat-block',
  templateUrl: './combat-block.component.html',
  styleUrls: ['./combat-block.component.less']
})
export class CombatBlockComponent {
  @Input() hero!: Hero;

  formatInit() {
    const bonus = this.hero.getAttrMod(Attributes.DEX);
    return bonus >= 0 ? `+${bonus}` : bonus;
  }

  getNumber(field: keyof Hero): Getter<number> {
    const val = (this.hero as any)[field];
    return () => val;
  }

  setNumber(field: keyof Hero): Setter<number> {
    return (val: number) => (this.hero as any)[field] = val;
  }

  valueStyle() {
    const int = this.hero.getAttrMod(Attributes.DEX);
    if (int > 0) return 'positive';
    else if (int == 0) return 'zero';
    else return 'negative';
  }
}

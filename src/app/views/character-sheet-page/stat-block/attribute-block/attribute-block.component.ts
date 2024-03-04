import { Component, Input } from '@angular/core';
import { Attributes, attributes } from 'src/app/domain/attribute';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-attribute-block',
  templateUrl: './attribute-block.component.html',
  styleUrls: ['./attribute-block.component.less']
})
export class AttributeBlockComponent {
  @Input() hero!: Hero;

  attributes = attributes;

  getAttribute(attr: Attributes) {
    return this.hero.attributes.get(attr)!;
  }

  getAttributeMod(attr: Attributes) {
    const mod = this.getAttribute(attr).modifier;
    let str =  mod >= 0 ? `+${mod}` : mod;
    if (this.isProficient(attr)) {
      const modProf = mod + this.hero.getProfBonus();
      const append = modProf >= 0 ? `+${modProf}` : modProf;
      str += ` (${append})`;
    }
    return str;
  }

  isProficient(attr: Attributes) {
    return this.getAttribute(attr).proficient;
  }

  valueStyle(attr: Attributes) {
    const mod = this.getAttribute(attr).modifier;
    if (mod > 0) return 'positive';
    else if (mod == 0) return 'zero';
    else return 'negative';
  }
}

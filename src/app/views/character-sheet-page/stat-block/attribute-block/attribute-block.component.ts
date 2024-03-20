import { Component, Input } from '@angular/core';
import { isMobile } from 'src/app/app.component';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
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
isMobile = isMobile();

constructor() {
  this.getAttrGetterFunction.bind(this);
  this.getAttributeSetterFunction.bind(this);
}

getAttribute(attr: Attributes) {
  return this.hero.attributes.get(attr)!;
}

getAttributeValue(attr: Attributes) {
  return this.getAttribute(attr).value;
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

getAttrGetterFunction(attr: Attributes): Getter<number> {
  return () => this.getAttributeValue(attr);
}

getAttributeSetterFunction(attr: Attributes): Setter<number> {
  return (val: number) => {
    const attribute = this.getAttribute(attr);
    attribute.value = val;
    this.hero.attributes.set(attr, attribute);
  };
}
}

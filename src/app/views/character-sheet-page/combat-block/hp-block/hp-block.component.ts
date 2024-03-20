import { Component, Input } from '@angular/core';
import { isMobile } from 'src/app/app.component';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-hp-block',
  templateUrl: './hp-block.component.html',
  styleUrls: ['./hp-block.component.less']
})
export class HpBlockComponent {
@Input() hero!: Hero;
isMobile = isMobile();

healthStyling() {
  let c = 'fine';
  if (this.hero.hp / this.hero.maxHp < 0.5) c = 'bloodied';
  if(this.hero.hp < 10) c = 'mortally-wounded';
  return c;
}
}

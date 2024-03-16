import { Component } from '@angular/core';
import { AbstractBlock } from '../abstract-block';
import { isMobile } from 'src/app/app.component';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.less']
})
export class StatBlockComponent extends AbstractBlock {

  isMobile: boolean = isMobile();

  proficency() {
    const bonus = this.hero.getProfBonus();
    return bonus >= 0 ? `+${bonus}` : bonus;
  }

  inspired() {
    return this.hero.inspiration;
  }
}

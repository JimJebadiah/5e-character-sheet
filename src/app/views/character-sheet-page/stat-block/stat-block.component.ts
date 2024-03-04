import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, startWith } from 'rxjs';
import { Attributes, Attribute } from 'src/app/domain/attribute';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.less']
})
export class StatBlockComponent {
  @Input() hero!: Hero;

  proficency() {
    const bonus = this.hero.getProfBonus();
    return bonus >= 0 ? `+${bonus}` : bonus;
  }

  inspired() {
    return this.hero.inspiration;
  }
}

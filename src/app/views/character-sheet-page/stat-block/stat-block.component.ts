import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, startWith } from 'rxjs';
import { Attributes, Attribute } from 'src/app/domain/attribute';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.less']
})
export class StatBlockComponent implements AfterViewInit {
  @Input() hero!: Hero;

  attributes = [Attributes.STR, Attributes.DEX, Attributes.CON, Attributes.INT, Attributes.WIS, Attributes.CHA];
  attributeSubject = new BehaviorSubject<Map<Attributes, Attribute>>(new Map());
  attributes$: Observable<Map<Attributes, Attribute>> = this.attributeSubject.asObservable();

  loaded = false;

  constructor( private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    console.log(this.hero);
  }

  getAttribute(attr: Attributes) {
    return this.hero.attributes.get(attr);
  }

  getAttributeMod(attr: Attributes) {
    const mod = this.hero.getAttrMod(attr);
    return mod >= 0 ? `+${mod}` : mod;
  }
}

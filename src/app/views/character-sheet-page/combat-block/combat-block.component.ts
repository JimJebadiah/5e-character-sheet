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
}

import { Component, Input, Type } from '@angular/core';
import { ListType } from 'src/app/components/list-block/list-data/list-type';
import { Hero } from 'src/app/domain/hero';
import { Weapon } from 'src/app/domain/weapon';

@Component({
  selector: 'app-weapons-block',
  templateUrl: './weapons-block.component.html',
  styleUrls: ['./weapons-block.component.less']
})
export class WeaponsBlockComponent {
  @Input() hero!: Hero;

  weaponType: Type<ListType> = Weapon;
}

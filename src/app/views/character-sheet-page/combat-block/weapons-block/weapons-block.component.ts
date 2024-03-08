import { ComponentType } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/domain/hero';
import { RangeWeapon, Weapon } from 'src/app/domain/weapon';
import { AbstractWeaponComponent } from './weapons/abstract-weapon.component';
import { MeleeWeaponComponent } from './weapons/melee-weapon/melee-weapon.component';
import { StandardRangeWeaponComponent } from './weapons/range/standard-range-weapon/standard-range-weapon.component';
import { FirearmRangeWeaponComponent } from './weapons/range/firearm-range-weapon/firearm-range-weapon.component';

@Component({
  selector: 'app-weapons-block',
  templateUrl: './weapons-block.component.html',
  styleUrls: ['./weapons-block.component.less']
})
export class WeaponsBlockComponent {
  @Input() hero!: Hero;

  determineComponent(weapon: Weapon): ComponentType<AbstractWeaponComponent> {
    if (weapon.type() === 'melee') return MeleeWeaponComponent;
    else if (weapon.type() === 'ranged') {
      const range = weapon as RangeWeapon;
      if (range.rangeType() === 'standard') return StandardRangeWeaponComponent;
      else if (range.rangeType() === 'firearm') return FirearmRangeWeaponComponent;
    }
    return MeleeWeaponComponent;
  }
}

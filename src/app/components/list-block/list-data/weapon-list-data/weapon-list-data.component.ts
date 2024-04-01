import { Component } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { RangeWeapon, Weapon } from 'src/app/domain/weapon';
import { ComponentType } from '@angular/cdk/portal';
import { AbstractListDialog } from '../../list-dialog/abstract-list-dialog';
import { ListType } from '../list-type';
import { AbstractWeaponComponent } from './weapons/abstract-weapon.component';
import { MeleeWeaponComponent } from './weapons/melee-weapon/melee-weapon.component';
import { FirearmRangeWeaponComponent } from './weapons/range/firearm-range-weapon/firearm-range-weapon.component';
import { StandardRangeWeaponComponent } from './weapons/range/standard-range-weapon/standard-range-weapon.component';
import { ListDialogWeaponComponent } from '../../list-dialog/list-dialog-weapon/list-dialog-weapon.component';

@Component({
  selector: 'app-weapon-list-data',
  templateUrl: './weapon-list-data.component.html',
  styleUrl: './weapon-list-data.component.less'
})
export class WeaponListDataComponent extends AbstractListData<Weapon> {


  determineComponent(weapon: Weapon): ComponentType<AbstractWeaponComponent> {
    if (weapon.type() === 'melee') return MeleeWeaponComponent;
    else if (weapon.type() === 'ranged') {
      const range = weapon as RangeWeapon;
      if (range.rangeType() === 'standard') return StandardRangeWeaponComponent;
      else if (range.rangeType() === 'firearm') return FirearmRangeWeaponComponent;
    }
    return MeleeWeaponComponent;
  }

  protected override listDialog(): ComponentType<AbstractListDialog<ListType>> {
    return ListDialogWeaponComponent;
  }

  protected override header(): string {
    return this.data.data.name;
  }

  protected override deleteCallback(): void { }
}

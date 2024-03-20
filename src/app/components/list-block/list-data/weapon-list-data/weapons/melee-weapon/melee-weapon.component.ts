import { Component } from '@angular/core';
import { AbstractWeaponComponent } from '../abstract-weapon.component';

@Component({
  selector: 'app-melee-weapon',
  templateUrl: './melee-weapon.component.html',
  styleUrls: ['./melee-weapon.component.less']
})
export class MeleeWeaponComponent extends AbstractWeaponComponent {

}

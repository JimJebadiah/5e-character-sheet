import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { WeaponsBlockComponent } from './weapons-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';
import { MeleeWeaponModule } from './weapons/melee-weapon/melee-weapon.module';
import { StandardRangeWeaponModule } from './weapons/range/standard-range-weapon/standard-range-weapon.module';
import { FirearmRangeWeaponModule } from './weapons/range/firearm-range-weapon/firearm-range-weapon.module';


@NgModule({
  declarations: [
    WeaponsBlockComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    EditableModule,
    NgComponentOutlet,
    MeleeWeaponModule,
    StandardRangeWeaponModule,
    FirearmRangeWeaponModule
  ],
  exports: [WeaponsBlockComponent]
})
export class WeaponsBlockModule { }

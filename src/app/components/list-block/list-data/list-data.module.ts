import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicListDataComponent } from './basic-list-data/basic-list-data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemListDataComponent } from './item-list-data/item-list-data.component';
import { MatCardModule } from '@angular/material/card';
import { FeatListDataComponent } from './feat-list-data/feat-list-data.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AbilityListDataComponent } from './ability-list-data/ability-list-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WeaponListDataComponent } from './weapon-list-data/weapon-list-data.component';
import { StandardRangeWeaponModule } from './weapon-list-data/weapons/range/standard-range-weapon/standard-range-weapon.module';
import { FirearmRangeWeaponModule } from './weapon-list-data/weapons/range/firearm-range-weapon/firearm-range-weapon.module';
import { MeleeWeaponModule } from './weapon-list-data/weapons/melee-weapon/melee-weapon.module';


@NgModule({
  declarations: [
    BasicListDataComponent,
    ItemListDataComponent,
    FeatListDataComponent,
    AbilityListDataComponent,
    WeaponListDataComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    StandardRangeWeaponModule,
    FirearmRangeWeaponModule,
    MeleeWeaponModule
  ]
})
export class ListDataModule { }

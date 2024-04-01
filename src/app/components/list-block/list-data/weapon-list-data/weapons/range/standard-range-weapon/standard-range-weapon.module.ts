import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardRangeWeaponComponent } from './standard-range-weapon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    StandardRangeWeaponComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class StandardRangeWeaponModule { }

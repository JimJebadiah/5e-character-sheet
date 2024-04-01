import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDialogBasicComponent } from './list-dialog-basic/list-dialog-basic.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ListDialogItemComponent } from './list-dialog-item/list-dialog-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ListDialogFeatComponent } from './list-dialog-feat/list-dialog-feat.component';
import { ListDialogAbilityComponent } from './list-dialog-ability/list-dialog-ability.component';
import { ListDialogWeaponComponent } from './list-dialog-weapon/list-dialog-weapon.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NumberFieldModule } from 'src/app/directives/number-field/number-field.module';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    ListDialogBasicComponent,
    ListDialogItemComponent,
    ListDialogFeatComponent,
    ListDialogAbilityComponent,
    ListDialogWeaponComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    NumberFieldModule,
    MatChipsModule
  ]
})
export class ListDialogModule { }

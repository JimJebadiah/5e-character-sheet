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



@NgModule({
  declarations: [
    ListDialogBasicComponent,
    ListDialogItemComponent
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
    ReactiveFormsModule
  ]
})
export class ListDialogModule { }

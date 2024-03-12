import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryBlockComponent } from './inventory-block.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';



@NgModule({
  declarations: [
    InventoryBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ConfirmationDialogModule
  ],
  exports: [
    InventoryBlockComponent
  ]
})
export class InventoryBlockModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryBlockComponent } from './inventory-block.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';



@NgModule({
  declarations: [
    InventoryBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ConfirmationDialogModule,
    ListBlockModule,
  ],
  exports: [
    InventoryBlockComponent
  ]
})
export class InventoryBlockModule { }

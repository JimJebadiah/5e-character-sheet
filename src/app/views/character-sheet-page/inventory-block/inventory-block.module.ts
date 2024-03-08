import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryBlockComponent } from './inventory-block.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    InventoryBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    InventoryBlockComponent
  ]
})
export class InventoryBlockModule { }

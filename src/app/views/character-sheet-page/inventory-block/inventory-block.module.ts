import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryBlockComponent } from './inventory-block.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';
import { EditableNumberStepDirective } from 'src/app/directives/editable-number-step/editable-number-step.directive';
import { EditableModule } from 'src/app/directives/editable.module';



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
    EditableModule
  ],
  exports: [
    InventoryBlockComponent
  ]
})
export class InventoryBlockModule { }

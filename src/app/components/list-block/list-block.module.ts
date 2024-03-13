import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlockComponent } from './list-block.component';
import { ListDataModule } from './list-data/list-data.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListDialogModule } from './list-dialog/list-dialog.module';



@NgModule({
  declarations: [
    ListBlockComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ListDataModule,
    ListDialogModule
  ],
  exports: [
    ListBlockComponent
  ]
})
export class ListBlockModule { }

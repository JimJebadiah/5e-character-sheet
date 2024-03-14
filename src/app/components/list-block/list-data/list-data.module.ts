import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicListDataComponent } from './basic-list-data/basic-list-data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemListDataComponent } from './item-list-data/item-list-data.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    BasicListDataComponent,
    ItemListDataComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class ListDataModule { }
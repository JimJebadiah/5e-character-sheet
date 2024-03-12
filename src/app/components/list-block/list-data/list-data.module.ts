import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicListDataComponent } from './basic-list-data/basic-list-data.component';



@NgModule({
  declarations: [
    BasicListDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasicListDataComponent
  ]
})
export class ListDataModule { }

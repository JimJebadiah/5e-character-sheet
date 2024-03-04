import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatBlockComponent } from './stat-block.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    StatBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [StatBlockComponent]
})
export class StatBlockModule { }

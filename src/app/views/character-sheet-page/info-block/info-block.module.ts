import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBlockComponent } from './info-block.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    InfoBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    InfoBlockComponent
  ]
})
export class InfoBlockModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsBlockComponent } from './skills-block.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    SkillsBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [SkillsBlockComponent],
})
export class SkillsBlockModule { }

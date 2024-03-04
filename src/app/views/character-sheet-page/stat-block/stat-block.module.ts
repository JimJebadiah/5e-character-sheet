import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatBlockComponent } from './stat-block.component';
import { MatCardModule } from '@angular/material/card';
import { AttributeBlockModule } from './attribute-block/attribute-block.module';
import { SkillsBlockModule } from './skills-block/skills-block.module';



@NgModule({
  declarations: [
    StatBlockComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AttributeBlockModule,
    SkillsBlockModule,
    MatCheckboxModule
  ],
  exports: [StatBlockComponent]
})
export class StatBlockModule { }

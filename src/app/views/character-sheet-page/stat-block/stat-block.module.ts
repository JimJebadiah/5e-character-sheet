import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatBlockComponent } from './stat-block.component';
import { MatCardModule } from '@angular/material/card';
import { AttributeBlockModule } from './attribute-block/attribute-block.module';
import { SkillsBlockModule } from './skills-block/skills-block.module';
import { EditableModule } from 'src/app/directives/editable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    StatBlockComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AttributeBlockModule,
    SkillsBlockModule,
    MatCheckboxModule,
    EditableModule,
    DragDropModule
  ],
  exports: [StatBlockComponent]
})
export class StatBlockModule { }

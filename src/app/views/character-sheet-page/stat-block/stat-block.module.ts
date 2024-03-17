import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { StatBlockComponent } from './stat-block.component';
import { MatCardModule } from '@angular/material/card';
import { AttributeBlockModule } from './attribute-block/attribute-block.module';
import { SkillsBlockModule } from './skills-block/skills-block.module';
import { EditableModule } from 'src/app/directives/editable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    StatBlockComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    AttributeBlockModule,
    SkillsBlockModule,
    MatCheckboxModule,
    EditableModule,
    DragDropModule,
    CdkScrollableModule
  ],
  exports: [StatBlockComponent]
})
export class StatBlockModule { }

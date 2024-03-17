import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesBlockComponent } from './features-block.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';
import { EditableModule } from 'src/app/directives/editable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    FeaturesBlockComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    EditableModule,
    ListBlockModule,
    CdkScrollableModule
  ],
  exports: [
    FeaturesBlockComponent
  ]
})
export class FeaturesBlockModule { }

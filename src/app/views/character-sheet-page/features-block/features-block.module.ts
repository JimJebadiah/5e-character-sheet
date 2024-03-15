import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesBlockComponent } from './features-block.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';
import { EditableModule } from 'src/app/directives/editable.module';



@NgModule({
  declarations: [
    FeaturesBlockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    EditableModule,
    ListBlockModule
  ],
  exports: [
    FeaturesBlockComponent
  ]
})
export class FeaturesBlockModule { }

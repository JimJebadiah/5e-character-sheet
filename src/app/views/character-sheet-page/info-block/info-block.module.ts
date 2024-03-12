import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBlockComponent } from './info-block.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableModule } from 'src/app/directives/editable.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';



@NgModule({
  declarations: [
    InfoBlockComponent
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
    InfoBlockComponent
  ]
})
export class InfoBlockModule { }

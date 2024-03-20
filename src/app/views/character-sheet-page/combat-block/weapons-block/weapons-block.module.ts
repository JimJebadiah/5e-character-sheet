import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { WeaponsBlockComponent } from './weapons-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { EditableModule } from 'src/app/directives/editable.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';


@NgModule({
  declarations: [
    WeaponsBlockComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    EditableModule,
    NgComponentOutlet,
    ListBlockModule
  ],
  exports: [WeaponsBlockComponent]
})
export class WeaponsBlockModule { }

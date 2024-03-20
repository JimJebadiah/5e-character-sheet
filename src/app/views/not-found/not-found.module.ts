import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }

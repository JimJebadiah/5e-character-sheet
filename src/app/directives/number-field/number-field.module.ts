import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFieldDirective } from './number-field.directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NumberFieldDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NumberFieldDirective
  ]
})
export class NumberFieldModule { }

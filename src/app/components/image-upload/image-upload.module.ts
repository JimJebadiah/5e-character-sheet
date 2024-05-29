import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUploadComponent} from "./image-upload.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";



@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIconButton,
    MatIcon
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule { }

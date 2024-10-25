import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CharacterModule } from './character/character.module';
import { CreateCharacterModule } from './create-character/create-character.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FooterModule} from '../../components/footer/footer.module';
import {ImageUploadModule} from "../../components/image-upload/image-upload.module";


@NgModule({
  declarations: [HomePageComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        CharacterModule,
        CreateCharacterModule,
        HeaderModule,
        FooterModule,
        ImageUploadModule
    ],
  exports: [HomePageComponent]
})
export class HomePageModule { }

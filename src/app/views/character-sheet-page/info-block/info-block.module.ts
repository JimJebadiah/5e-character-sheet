import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBlockComponent } from './info-block.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableModule } from 'src/app/directives/editable.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagePreloadModule } from 'src/app/directives/image-preload/image-preload.module';
import {CharacterImageModule} from "../../../components/character-image/character-image.module";



@NgModule({
  declarations: [
    InfoBlockComponent
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
        CdkScrollableModule,
        ImagePreloadModule,
        CharacterImageModule
    ],
  exports: [
    InfoBlockComponent
  ]
})
export class InfoBlockModule { }

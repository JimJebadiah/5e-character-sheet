import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "src/app/components/header/header.module";
import { CharacterSheetPageComponent } from "./character-sheet-page.component";
import { InfoBlockModule } from "./info-block/info-block.module";
import { StatBlockModule } from "./stat-block/stat-block.module";
import { CombatBlockModule } from "./combat-block/combat-block.module";
import { InventoryBlockModule } from "./inventory-block/inventory-block.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FeaturesBlockModule } from "./features-block/features-block.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkScrollableModule } from "@angular/cdk/scrolling";




@NgModule({
  declarations: [
    CharacterSheetPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HeaderModule,
    MatIconModule,
    InfoBlockModule,
    StatBlockModule,
    CombatBlockModule,
    FeaturesBlockModule,
    InventoryBlockModule,
    RouterModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatTabsModule
  ]
})
export class CharacterSheetPageModule { }

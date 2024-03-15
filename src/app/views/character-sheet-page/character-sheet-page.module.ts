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




@NgModule({
  declarations: [
    CharacterSheetPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    InfoBlockModule,
    StatBlockModule,
    CombatBlockModule,
    FeaturesBlockModule,
    InventoryBlockModule,
    RouterModule,
    MatProgressSpinnerModule
  ]
})
export class CharacterSheetPageModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "src/app/components/header/header.module";
import { CharacterSheetPageComponent } from "./character-sheet-page.component";
import { InfoBlockModule } from "./info-block/info-block.module";
import { StatBlockModule } from "./stat-block/stat-block.module";
import { CombatBlockModule } from "./combat-block/combat-block.module";
import { InventoryBlockModule } from "./inventory-block/inventory-block.module";




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
    InventoryBlockModule,
    RouterModule
  ]
})
export class CharacterSheetPageModule { }

import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';
import { InfoBlockModule } from './info-block/info-block.module';
import { StatBlockComponent } from './stat-block/stat-block.component';
import { InfoBlockComponent } from './info-block/info-block.component';
import { CombatBlockComponent } from './combat-block/combat-block.component';
import { InventoryBlockComponent } from './inventory-block/inventory-block.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AbstractBlock, Blocks } from './abstract-block';
import { FeaturesBlockComponent } from './features-block/features-block.component';
import { ComponentType } from '@angular/cdk/portal';
import { Block } from '@angular/compiler';
import { isMobile } from 'src/app/app.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-character-sheet-page',
  templateUrl: './character-sheet-page.component.html',
  styleUrls: ['./character-sheet-page.component.less'],
})
export class CharacterSheetPageComponent implements OnInit, AfterViewInit {
  hero!: Hero
  loaded: boolean = false;
  isMobile: boolean = isMobile();

  blockMap = new Map<Blocks, ComponentType<AbstractBlock>>();
  nameMap = new Map<Blocks, string>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dbService: GitdbService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.blockMap.set(Blocks.STAT, StatBlockComponent);
    this.blockMap.set(Blocks.COMBAT, CombatBlockComponent);
    this.blockMap.set(Blocks.FEATURES, FeaturesBlockComponent);
    this.blockMap.set(Blocks.INVENTORY, InventoryBlockComponent);

    this.nameMap.set(Blocks.STAT, "Stats");
    this.nameMap.set(Blocks.COMBAT, "Combat");
    this.nameMap.set(Blocks.FEATURES, "Features");
    this.nameMap.set(Blocks.INVENTORY, "Inventory");

    this.activeIndex = Number.parseInt(localStorage.getItem('activeIndex') ?? '0');
  }

  blocks: number[] = [];

  mobileBlocks: ComponentType<AbstractBlock>[] = [
    InfoBlockComponent,
    StatBlockComponent,
    CombatBlockComponent,
    FeaturesBlockComponent,
    InventoryBlockComponent
  ]

  onDrop(event: CdkDragDrop<Type<AbstractBlock[]>>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
    this.hero.blockOrder = this.blocks;
    this.dbService.update(this.hero);
  }

  onTabDrop(event: CdkDragDrop<Type<AbstractBlock[]>>) {
    let previousIndex = parseInt(event.previousContainer.id.replace("list-",""));
    let currentIndex = parseInt(event.container.id.replace("list-",""));
    if(previousIndex !== undefined && currentIndex !== undefined && previousIndex !== currentIndex){
      moveItemInArray(this.blocks, previousIndex, currentIndex);
      this.hero.blockOrder = this.blocks;
      this.dbService.update(this.hero);
    }
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') as string;
    this.dbService.getHero(name).pipe(delay(0)).subscribe((hero) => {
      this.hero = hero;
      this.loaded = true;
      this.blocks = this.hero.blockOrder;
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  activeIndex = 1;
  getActiveComponent(): ComponentType<AbstractBlock> {
    if (this.activeIndex === 0) return InfoBlockComponent;
    else return this.blockMap.get(this.blocks[this.activeIndex - 1])!;
  }

  setActiveIndex(index: number) {
    console.log(index);
    this.activeIndex = index;
    this.updateActive();
  }

  subtitles(): string[] {
    return [
      `Level ${this.hero.level} ${this.hero.class}`,
      `Background: ${this.hero.background}`,
      `Alignment: ${this.hero.alignment}`
    ];
  }

  tabs(): string[] {
    let list = ['Info'];
    this.blockMap.forEach((v, k) => {
      list.push(this.nameMap.get(k) ?? 'Unknown');
    });
    return list;
  }

  listConnections(index: number) {
    let connections = []
    for (var i=0;i<this.tabs.length;i++){
      if(i != index){
        connections.push("list-"+i);
      }
    }
    return connections;
  }

  private updateActive() {
    localStorage.setItem('activeIndex', this.activeIndex.toString());
  }
}

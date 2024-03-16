import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, Type } from '@angular/core';
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

@Component({
  selector: 'app-character-sheet-page',
  templateUrl: './character-sheet-page.component.html',
  styleUrls: ['./character-sheet-page.component.less']
})
export class CharacterSheetPageComponent implements OnInit, AfterViewInit {

  hero!: Hero;
  loaded: boolean = false;
  isMobile: boolean = isMobile();

  blockMap = new Map<Blocks, ComponentType<AbstractBlock>>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dbService: GitdbService,
    private readonly cdr: ChangeDetectorRef
  ) { 
    this.blockMap.set(Blocks.STAT, StatBlockComponent);
    this.blockMap.set(Blocks.COMBAT, CombatBlockComponent);
    this.blockMap.set(Blocks.FEATURES, FeaturesBlockComponent);
    this.blockMap.set(Blocks.INVENTORY, InventoryBlockComponent);
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
  getActiveComponent() {
    return this.mobileBlocks[this.activeIndex];
  }

  mobileOnSwipeLeft(): void {
    this.activeIndex = (this.activeIndex + 1) % this.mobileBlocks.length;
    console.log(this.activeIndex);
  }

  mobileOnSwipeRight(): void {
    this.activeIndex = (this.activeIndex - 1);
    if (this.activeIndex < 0) this.activeIndex = this.mobileBlocks.length - 1;

    console.log(this.activeIndex);
  }

  subtitles(): string[] {
    return [
      `Level ${this.hero.level} ${this.hero.class}`,
      `Background: ${this.hero.background}`,
      `Alignment: ${this.hero.alignment}`
    ];
  }
}

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
import { AbstractBlock } from './abstract-block';

@Component({
  selector: 'app-character-sheet-page',
  templateUrl: './character-sheet-page.component.html',
  styleUrls: ['./character-sheet-page.component.less']
})
export class CharacterSheetPageComponent implements OnInit, AfterViewInit {

  hero!: Hero;
  loaded: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dbService: GitdbService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  blocks: Type<AbstractBlock>[] = [
    InfoBlockComponent,
    StatBlockComponent,
    CombatBlockComponent,
    InventoryBlockComponent
  ];

  onDrop(event: CdkDragDrop<Type<AbstractBlock[]>>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') as string;
    this.dbService.getHero(name).pipe(delay(0)).subscribe((hero) => {
      this.hero = hero;
      this.loaded = true;
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }


  subtitles(): string[] {
    return [
      `Level ${this.hero.level} ${this.hero.class}`,
      `Background: ${this.hero.background}`,
      `Alignment: ${this.hero.alignment}`
    ];
  }
}

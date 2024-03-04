import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

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

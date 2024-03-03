import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-character-sheet-page',
  templateUrl: './character-sheet-page.component.html',
  styleUrls: ['./character-sheet-page.component.less']
})
export class CharacterSheetPageComponent implements OnInit {

  hero: Hero = Hero.empty('Loading...');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dbService: GitdbService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') as string;
    this.dbService.getHero(name).subscribe((hero) => {
      this.hero = hero;
    });
  }


  subtitle() {
    return `Level ${this.hero.level} ${this.hero.class}`;
  }
}

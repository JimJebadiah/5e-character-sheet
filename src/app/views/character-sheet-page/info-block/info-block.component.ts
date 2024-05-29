import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basic } from 'src/app/components/list-block/list-data/basic-list-data/basic';
import { GitdbService } from 'src/app/services/gitdb.service';
import { AbstractBlock } from '../abstract-block';
import { ListType } from 'src/app/components/list-block/list-data/list-type';
import { swipeAnimation } from '../swipe-animation';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.less'],
  animations: [swipeAnimation]
})
export class InfoBlockComponent extends AbstractBlock implements OnInit {

  languageListType = Basic;
  languages: Basic[] = [];

  constructor(
    private readonly dbService: GitdbService,
    private readonly router: Router,
  ) {
    super();
  }

  updateLanguages(event: ListType[]) {
    if (event.filter((i) => i instanceof Basic).length === event.length) {
      this.hero.languages = (event as Basic[]).map((l) => l.val);
      this.languages = this.hero.languages.map((l) => new Basic(l));
      this.dbService.update(this.hero);
    }
  }

  ngOnInit(): void {
    this.languages = this.hero.languages.map((l) => new Basic(l));
  }

  goBack() {
    this.router.navigate(['']);
  }
}

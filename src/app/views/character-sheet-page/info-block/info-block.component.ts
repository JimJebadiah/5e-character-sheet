import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basic } from 'src/app/components/list-block/list-data/basic-list-data/basic';
import { GitdbService } from 'src/app/services/gitdb.service';
import { AbstractBlock } from '../abstract-block';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.less']
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

  ngOnInit(): void {
    this.languages = this.hero.languages.map((l) => new Basic(l));
  }

  getImageString(): Observable<string> {
    return this.dbService.getImageString(this.hero.name!);
  }

  goBack() {
    this.router.navigate(['']);
  }
}

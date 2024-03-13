import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basic } from 'src/app/components/list-block/list-data/basic-list-data/basic';
import { BasicListDataComponent } from 'src/app/components/list-block/list-data/basic-list-data/basic-list-data.component';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.less']
})
export class InfoBlockComponent implements OnInit {
  @Input() hero!: Hero;

  languageListType = Basic;
  languages: Basic[] = [];

  constructor(
    private readonly dbService: GitdbService,
    private readonly router: Router,
  ) {}

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

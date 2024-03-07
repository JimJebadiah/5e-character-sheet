import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.less']
})
export class InfoBlockComponent {
  @Input() hero!: Hero;

  constructor(
    private readonly dbService: GitdbService,
    private readonly router: Router,
  ) {}

  getImageString(): Observable<string> {
    return this.dbService.getImageString(this.hero.name!);
  }

  goBack() {
    this.router.navigate(['']);
  }
}

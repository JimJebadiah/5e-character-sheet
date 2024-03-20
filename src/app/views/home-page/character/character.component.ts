import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less']
})
export class CharacterComponent {
  @Input() hero!: Hero;


  constructor(
    private readonly router: Router,
    private readonly dbService: GitdbService
  ) {}

  getImageString(): Observable<string> {
    return this.dbService.getImageString(this.hero.name);
  }

  goToSheet() {
    this.router.navigate(['character', this.hero.name]);
  }
}

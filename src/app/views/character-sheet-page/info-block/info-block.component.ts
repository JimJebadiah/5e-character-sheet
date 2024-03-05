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
  ) {
    this.getString.bind(this);
  }

  getImageString(): Observable<string> {
    return this.dbService.getImageString(this.hero.name!);
  }

  goBack() {
    this.router.navigate(['']);
  }

  getString(field: keyof Hero): Getter<string> {
    const val = (this.hero as any)[field];
    return () => val;
  }

  setString(field: keyof Hero): Setter<string> {
    return (val: string) => (this.hero as any)[field] = val;
  }
}

import { Component } from '@angular/core';
import { AbstractWeaponComponent } from '../../abstract-weapon.component';
import { RangeWeapon } from 'src/app/domain/weapon';
import { RangeService } from 'src/app/services/range.service';

@Component({
  selector: 'app-standard-range-weapon',
  templateUrl: './standard-range-weapon.component.html',
  styleUrls: ['./standard-range-weapon.component.less']
})
export class StandardRangeWeaponComponent extends AbstractWeaponComponent {
  range!: RangeWeapon;

  constructor(private readonly rangeService: RangeService) {
    super();
  }

  ngOnInit(): void {
    this.range = this.weapon as RangeWeapon;
  }

  fire() {
    this.rangeService.fireSubject.next(this.range.id);
  }
}

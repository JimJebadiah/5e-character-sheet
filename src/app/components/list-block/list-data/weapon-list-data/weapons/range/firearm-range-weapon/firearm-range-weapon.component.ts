import { RangeService } from 'src/app/services/range.service';
import { Component, OnInit } from '@angular/core';
import { AbstractWeaponComponent } from '../../abstract-weapon.component';
import { Firearm } from 'src/app/domain/weapon';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-firearm-range-weapon',
  templateUrl: './firearm-range-weapon.component.html',
  styleUrls: ['./firearm-range-weapon.component.less']
})
export class FirearmRangeWeaponComponent extends AbstractWeaponComponent implements OnInit {

  firearm!: Firearm;
  emptyGroup = new FormControl();

  constructor(private readonly rangeService: RangeService) {
    super();
  }

  ngOnInit(): void {
    this.firearm = this.weapon as Firearm;
  }

  statusIcon() {
    if (this.firearm.status === 'operational') return 'check_circle';
    else if (this.firearm.status === 'jammed') return 'do_not_disturb_on';
    else return 'cancel';
  }

  statusClass() {
    if (this.firearm.status === 'operational') return 'good';
    else if (this.firearm.status === 'jammed') return 'mid';
    else return 'bad';
  }

  rounds() {
    const a = [];
    for (let i = 0; i < this.firearm.rounds; i++) {
      a.push(i);
    }
    return a;
  }

  loaded(i: number) {
    return i < this.firearm.loaded;
  }

  fire() {
    this.rangeService.fireSubject.next(this.firearm.id);
  }

  reload() {
    this.rangeService.reloadSubject.next(this.firearm.id);
  }

  status() {
    return this.firearm.status.charAt(0).toUpperCase() + this.firearm.status.substring(1);
  }

  nextState() {
    this.rangeService.statusSubject.next(this.firearm.id);
  }
}

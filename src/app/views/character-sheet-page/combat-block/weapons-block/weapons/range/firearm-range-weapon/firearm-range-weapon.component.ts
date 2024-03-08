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

  firearm!: Firearm
  emptyGroup = new FormControl();

  ngOnInit(): void {
    this.firearm = this.weapon as Firearm;
    this.firearm.loaded = 5;
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
    this.firearm.fire();
  }

  reload() {
    this.firearm.reload(this.firearm.rounds);
  }

  status() {
    return this.firearm.status.charAt(0).toUpperCase() + this.firearm.status.substring(1);
  }
}

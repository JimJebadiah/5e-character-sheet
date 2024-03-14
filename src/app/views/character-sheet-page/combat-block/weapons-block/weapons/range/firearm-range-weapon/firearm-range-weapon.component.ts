import { GitdbService } from 'src/app/services/gitdb.service';
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

  constructor(private readonly dbService: GitdbService) {
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
    this.firearm.fire();
    this.dbService.update(this.hero);
  }

  reload() {
    console.log(this.hero.inventory);
    const hasBullets = this.hero.inventory.filter((i) => i.ammunitionType === 'bullet').length > 0;
    if (hasBullets) {
      const reloadAmount = this.firearm.rounds - this.firearm.loaded;

      let index = 0;
      let bulletItem = null;
      for (index = 0; index < this.hero.inventory.length; index++) {
        if (this.hero.inventory[index].ammunitionType === 'bullet') {
          bulletItem = this.hero.inventory[index];
          break;
        }
      }
      
      if (bulletItem!.count > reloadAmount) {
        this.firearm.reload(reloadAmount);
        bulletItem!.count -= reloadAmount;
      } else {
        this.firearm.reload(bulletItem!.count);
        this.hero.inventory.splice(index, 1);
      }
      this.dbService.update(this.hero);
    }
  }

  status() {
    return this.firearm.status.charAt(0).toUpperCase() + this.firearm.status.substring(1);
  }

  nextState() {
    if (this.firearm.status === 'operational') this.firearm.misfire();
    else if (this.firearm.status === 'jammed') this.firearm.break();
    else this.firearm.repair();
    this.dbService.update(this.hero);
  }
}

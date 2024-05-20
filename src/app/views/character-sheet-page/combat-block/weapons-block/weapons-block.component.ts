import { Component, Input, OnInit, Type } from '@angular/core';
import { ListType } from 'src/app/components/list-block/list-data/list-type';
import { Hero } from 'src/app/domain/hero';
import { Firearm, RangeWeapon, Weapon } from 'src/app/domain/weapon';
import { GitdbService } from 'src/app/services/gitdb.service';
import { RangeService } from 'src/app/services/range.service';

@Component({
  selector: 'app-weapons-block',
  templateUrl: './weapons-block.component.html',
  styleUrls: ['./weapons-block.component.less']
})
export class WeaponsBlockComponent implements OnInit {
  @Input() hero!: Hero;

  weaponType: Type<ListType> = Weapon;

  constructor(
    private readonly rangeService: RangeService,
    private readonly dbService: GitdbService
  ) {}

  ngOnInit(): void {
    this.reload();
    this.fire();
    this.status();
  }

  updateList(event: ListType[]): void {
    if (event.filter((i) => i instanceof Weapon).length === event.length) {
      this.hero.weapons = event as Weapon[];

      this.hero.weapons.forEach((w) => {
        w.setAttackRole(this.hero);
        w.setDamageRole(this.hero);

        if (w instanceof Firearm) w.hasAmmo = this.hasBullets();
        else if (w instanceof RangeWeapon) w.hasAmmo = this.hasArrows();
      });

      this.dbService.update(this.hero);
    }
  }

  reload() {
    this.rangeService.reaload$.subscribe((weaponId) => {
      const firearm = this.hero.weapons.find((w) => w.id === weaponId)! as Firearm;
      const hasBullets = this.hasBullets();
      if (hasBullets) {
        const reloadAmount = firearm.rounds - firearm.loaded;

        let index = 0;
        let bulletItem = null;
        for (index = 0; index < this.hero.inventory.length; index++) {
          if (this.hero.inventory[index].ammunitionType === 'bullet') {
            bulletItem = this.hero.inventory[index];
            break;
          }
        }

        if (bulletItem!.count > reloadAmount) {
          firearm.reload(reloadAmount);
          bulletItem!.count -= reloadAmount;
        } else {
          firearm.reload(bulletItem!.count);
          this.hero.inventory.splice(index, 1);
        }

        this.hero.weapons.forEach((w) => {
          if (w instanceof Firearm) w.hasAmmo = this.hasBullets();
          else if (w instanceof RangeWeapon) w.hasAmmo = this.hasArrows();
        });

        this.dbService.update(this.hero);
      }
    });
  }

  fire() {
    this.rangeService.fire$.subscribe((weaponId) => {
      console.log('asdf');
      const weapon = this.hero.weapons.find((w) => w.id === weaponId)! as RangeWeapon;
      if (weapon instanceof Firearm) {
        weapon.fire();
      } else if (weapon instanceof RangeWeapon) {
        this.fireArrow();
      }

      console.log(this.hasBullets());

      this.hero.weapons.forEach((w) => {
        if (w instanceof Firearm) w.hasAmmo = this.hasBullets();
        else if (w instanceof RangeWeapon) w.hasAmmo = this.hasArrows();
      });

      this.dbService.update(this.hero);
    });
  }

  status() {
    this.rangeService.status$.subscribe((weaponId) => {
      const firearm = this.hero.weapons.find((w) => w.id === weaponId)! as Firearm;
      if (firearm.status === 'operational') firearm.misfire();
      else if (firearm.status === 'jammed') firearm.break();
      else firearm.repair();
      this.dbService.update(this.hero);
    });
  }

  private fireArrow() {
    const hasArrows = this.hasArrows();
    if (hasArrows) {
      let index = 0;
      let arrowItem = null;

      for (index = 0; index < this.hero.inventory.length; index++) {
        if (this.hero.inventory[index].ammunitionType === 'arrow') {
          arrowItem = this.hero.inventory[index];
          break;
        }
      }

      arrowItem!.count--;
      if (arrowItem!.count <= 0) {
        this.hero.inventory.splice(index, 1);
      }


      this.dbService.update(this.hero);
    }
  }

  private hasBullets(): boolean {
    return this.hero.inventory.filter((i) => i.ammunitionType === 'bullet').length > 0;
  }

  private hasArrows(): boolean {
    return this.hero.inventory.filter((i) => i.ammunitionType === 'arrow').length > 0;
  }
}

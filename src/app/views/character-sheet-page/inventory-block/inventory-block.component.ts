import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditableNumberStepDialogComponent } from 'src/app/components/editable-dialog/editable-number-step-dialog/editable-number-step-dialog.component';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { Item } from 'src/app/domain/item';
import { AbstractBlock } from '../abstract-block';
import { ListType } from 'src/app/components/list-block/list-data/list-type';
import { GitdbService } from 'src/app/services/gitdb.service';
import { swipeAnimation } from '../swipe-animation';
import { Firearm, RangeWeapon } from 'src/app/domain/weapon';

@Component({
  selector: 'app-inventory-block',
  templateUrl: './inventory-block.component.html',
  styleUrls: ['./inventory-block.component.less'],
  animations: [swipeAnimation]
})
export class InventoryBlockComponent extends AbstractBlock implements OnInit {
  inventoryType: Type<ListType> = Item;

  currency = ['Platinum', 'Gold', 'Electrum', 'Silver', 'Copper'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly dbService: GitdbService,
  ) {
    super();
    this.getCurrency.bind(this);
  }

  ngOnInit(): void { }

  updateList(event: ListType[]) {
    if (event.filter((i) => i instanceof Item).length === event.length) {
      this.hero.inventory = event as Item[];

      this.hero.weapons.forEach((w) => {
        if (w instanceof Firearm) w.hasAmmo = this.hasBullets();
        else if (w instanceof RangeWeapon) w.hasAmmo = this.hasArrows();
      });

      this.dbService.update(this.hero);
    }
  }

  openDialogAdd(k: string) {
    this.dialog.open(EditableNumberStepDialogComponent, {
      data: {
        hero: this.hero,
        getter: this.getCurrency(k),
        setter: this.addCurrency(k)
      }
    });
  }

  openDialogRemove(k: string) {
    this.dialog.open(EditableNumberStepDialogComponent, {
      data: {
        hero: this.hero,
        getter: this.getCurrency(k),
        setter: this.removeCurrency(k)
      }
    });
  }

  getCurrency(k: string): Getter<number> {
    return () => this.hero.currency.get(k)!;
  }

  addCurrency(k: string): Setter<number> {
    return (val) => {
      let curr = this.hero.currency.get(k)!;
      curr += val;
      this.hero.currency.set(k, curr);
    };
  }

  removeCurrency(k: string): Setter<number> {
    return (val) => {
      let curr = this.hero.currency.get(k)!;
      curr -= val;
      if (curr < 0) curr = 0;
      this.hero.currency.set(k, curr);
    };
  }

  private hasBullets(): boolean {
    return this.hero.inventory.filter((i) => i.ammunitionType === 'bullet').length > 0;
  }

  private hasArrows(): boolean {
    return this.hero.inventory.filter((i) => i.ammunitionType === 'arrow').length > 0;
  }
}

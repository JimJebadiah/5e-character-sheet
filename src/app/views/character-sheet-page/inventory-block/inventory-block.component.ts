import { Component, Input, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditableNumberStepDialogComponent } from 'src/app/components/editable-dialog/editable-number-step-dialog/editable-number-step-dialog.component';
import { ListType } from 'src/app/components/list-block/list-block.component';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { Hero } from 'src/app/domain/hero';
import { Item } from 'src/app/domain/item';
import { AbstractBlock } from '../abstract-block';

@Component({
  selector: 'app-inventory-block',
  templateUrl: './inventory-block.component.html',
  styleUrls: ['./inventory-block.component.less']
})
export class InventoryBlockComponent extends AbstractBlock implements OnInit{
  items: Item[] = [];

  inventoryType: Type<ListType> = Item;

  currency = ['Platinum', 'Gold', 'Electrum', 'Silver', 'Copper'];

  constructor(
    private readonly dialog: MatDialog
  ) { 
    super();
    this.getCurrency.bind(this);
  }

  ngOnInit(): void {
    this.items = this.hero.inventory;
  }

  openDialogAdd(k: string) {
    this.dialog.open(EditableNumberStepDialogComponent, {
      data: {
        hero: this.hero,
        getter: this.getCurrency(k),
        setter: this.addCurrency(k)
      }
    })
  }

  openDialogRemove(k: string) {
    this.dialog.open(EditableNumberStepDialogComponent, {
      data: {
        hero: this.hero,
        getter: this.getCurrency(k),
        setter: this.removeCurrency(k)
      }
    })
  }

  getCurrency(k: string): Getter<number> {
    return () => this.hero.currency.get(k)!;
  }

  addCurrency(k: string): Setter<number> {
    return (val) => {
      let curr = this.hero.currency.get(k)!;
      curr += val;
      this.hero.currency.set(k, curr);
    }
  }

  removeCurrency(k: string): Setter<number> {
    return (val) => {
      let curr = this.hero.currency.get(k)!;
      curr -= val;
      if (curr < 0) curr = 0;
      this.hero.currency.set(k, curr);
    }
  }
}

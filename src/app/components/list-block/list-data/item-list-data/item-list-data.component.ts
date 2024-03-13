import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../list.service';
import { AbstractListData } from '../abstract-list-data';
import { Item } from 'src/app/domain/item';

@Component({
  selector: 'app-item-list-data',
  templateUrl: './item-list-data.component.html',
  styleUrls: ['./item-list-data.component.less']
})
export class ItemListDataComponent extends AbstractListData<Item> {
  constructor(dialog: MatDialog, listService: ListService) {
    super(dialog, listService);
  }

  add() {
    this.data.data.increment();
  }

  remove() {
    this.data.data.decrement();
    if (this.data.data.count === 0) {
      this.onDelete();
    }
  }

  protected override deleteCallback(res: boolean): void {
    if (!res) this.data.data.increment();
  }
}

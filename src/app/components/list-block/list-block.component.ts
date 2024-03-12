import { Component, Input, Type } from '@angular/core';
import { Item } from 'src/app/domain/item';
import { AbstractListData } from './list-data/abstract-list-data';
import { BasicListDataComponent } from './list-data/basic-list-data/basic-list-data.component';
import { Basic } from './list-data/basic-list-data/basic';
import { ComponentType } from '@angular/cdk/portal';
import { ListData } from './list-data';

export type ListType = Item | Basic;

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.less']
})
export class ListBlockComponent {
  @Input() header: string = '';
  @Input() items: ListType[] = [];

  constructor() {
    this.remove.bind(this);
  }

  addItem(n: ListType) {
    this.items.push(n);
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }

  getComponent(item: ListType): ComponentType<AbstractListData<any>> {
    if (item instanceof Basic) return BasicListDataComponent;
    if (item instanceof Item) return BasicListDataComponent;
    else return BasicListDataComponent;
  }

  wrap(item: ListType): ListData<ListType> {
    return new ListData(item);
  }
}
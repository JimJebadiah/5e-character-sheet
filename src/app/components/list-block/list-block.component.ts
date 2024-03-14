import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { Item } from 'src/app/domain/item';
import { AbstractListData } from './list-data/abstract-list-data';
import { BasicListDataComponent } from './list-data/basic-list-data/basic-list-data.component';
import { Basic } from './list-data/basic-list-data/basic';
import { ComponentType } from '@angular/cdk/portal';
import { ListData } from './list-data';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogBasicComponent } from './list-dialog/list-dialog-basic/list-dialog-basic.component';
import { ListService } from './list.service';
import { ItemListDataComponent } from './list-data/item-list-data/item-list-data.component';
import { ListDialogItemComponent } from './list-dialog/list-dialog-item/list-dialog-item.component';
import { ListType } from './list-data/list-type';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockComponent implements OnInit, OnDestroy {
  @Input() header: string = '';
  @Input() listId!: number;
  @Input() type!: Type<ListType>;
  @Input() items: ListType[] = [];

  @Output() updateItemList: EventEmitter<ListType[]> = new EventEmitter<ListType[]>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly listService: ListService
  ) { }

  destroyed = new Subject<void>;
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.listService.remove$.pipe(takeUntil(this.destroyed)).subscribe(([index, listId]) => {
      if (listId === this.listId) {
        this.items.splice(index, 1)
        this.updateItemList.next(this.items);
      }
    });
  }

  addItem(n: ListType) {
    this.updateItemList.next([...this.items, n]);
  }

  getItems(): ListType[] {
    return this.items;
  }

  getComponent(): ComponentType<AbstractListData<any>> {
    let type;
    switch(this.type) {
      case Item:
        type = ItemListDataComponent;
        break;
      default: 
        type = BasicListDataComponent;
        break;
    }
    return type;
  }

  getDialog(): ComponentType<any> {
    let dialogType;
    switch(this.type) {
      case Item:
        dialogType = ListDialogItemComponent
        break;
      default:
        dialogType = ListDialogBasicComponent
        break;
    }
    return dialogType;
  }

  openDialog() {
    this.dialog.open(this.getDialog(), {
      data: {
        header: 'Add to List',
        edit: true,
        index: -1
      }
    }).afterClosed().subscribe((res: ListType | null) => {
      if (res !== null) {
        this.addItem(res);
      }
    });
  }

  wrap(item: ListType): ListData<ListType> {
    return new ListData(item);
  }
}
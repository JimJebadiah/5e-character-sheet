import { WeaponListDataComponent } from './list-data/weapon-list-data/weapon-list-data.component';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { Item } from 'src/app/domain/item';
import { AbstractListData } from './list-data/abstract-list-data';
import { BasicListDataComponent } from './list-data/basic-list-data/basic-list-data.component';
import { ComponentType } from '@angular/cdk/portal';
import { ListData } from './list-data';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogBasicComponent } from './list-dialog/list-dialog-basic/list-dialog-basic.component';
import { ListService } from './list.service';
import { ItemListDataComponent } from './list-data/item-list-data/item-list-data.component';
import { ListDialogItemComponent } from './list-dialog/list-dialog-item/list-dialog-item.component';
import { ListType } from './list-data/list-type';
import { Subject, takeUntil } from 'rxjs';
import { FeatListDataComponent } from './list-data/feat-list-data/feat-list-data.component';
import { ListDialogFeatComponent } from './list-dialog/list-dialog-feat/list-dialog-feat.component';
import { Feat } from 'src/app/domain/feat';
import { Ability } from 'src/app/domain/ability';
import { AbilityListDataComponent } from './list-data/ability-list-data/ability-list-data.component';
import { ListDialogAbilityComponent } from './list-dialog/list-dialog-ability/list-dialog-ability.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { isMobile } from 'src/app/app.component';
import { Hero } from 'src/app/domain/hero';
import { Weapon } from 'src/app/domain/weapon';

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.less'],
})
export class ListBlockComponent implements OnInit, OnDestroy {
  @Input() header: string = '';
  @Input() listId!: number;
  @Input() hero!: Hero;
  @Input() type!: Type<ListType>;
  @Input() items: ListType[] = [];

  @Output() updateItemList: EventEmitter<ListType[]> = new EventEmitter<ListType[]>();

  isMobile = isMobile();
  @HostBinding('style.width') width = this.isMobile ? '95% !important' : '';

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
        this.items.splice(index, 1);
        this.updateItemList.emit(this.items);
      }
    });

    this.listService.update$.pipe(takeUntil(this.destroyed)).subscribe(([item, index, listId]) => {
      if (listId === this.listId) {
        this.items[index] = item;
        this.updateItemList.emit(this.items);
      }
    });
  }

  onDrop(event: CdkDragDrop<Type<ListType[]>>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.updateItemList.emit(this.items);
  }

  addItem(n: ListType) {
    this.updateItemList.emit([...this.items, n]);
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
    case Feat:
      type = FeatListDataComponent;
      break;
    case Ability:
      type = AbilityListDataComponent;
      break;
    case Weapon:
      type = WeaponListDataComponent;
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
      dialogType = ListDialogItemComponent;
      break;
    case Feat:
      dialogType = ListDialogFeatComponent;
      break;
    case Ability:
      dialogType = ListDialogAbilityComponent;
      break;
    default:
      dialogType = ListDialogBasicComponent;
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

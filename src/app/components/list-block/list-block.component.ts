import { Component, Input, OnInit, Type } from '@angular/core';
import { Item } from 'src/app/domain/item';
import { AbstractListData } from './list-data/abstract-list-data';
import { BasicListDataComponent } from './list-data/basic-list-data/basic-list-data.component';
import { Basic } from './list-data/basic-list-data/basic';
import { ComponentType } from '@angular/cdk/portal';
import { ListData } from './list-data';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogBasicComponent } from './list-dialog/list-dialog-basic/list-dialog-basic.component';
import { ListService } from './list.service';

export type ListType = Item | Basic;

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockComponent implements OnInit {
  @Input() header: string = '';
  @Input() type!: Type<ListType>;
  @Input() items: ListType[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly listService: ListService
  ) { }

  ngOnInit(): void {
    this.listService.remove$.subscribe((index) => {
      this.items.splice(index, 1);
    });
  }

  addItem(n: ListType) {
    this.items = [...this.items, n];
  }

  getItems(): ListType[] {
    return this.items;
  }

  getComponent(): ComponentType<AbstractListData<any>> {
    let type;
    switch(this.type) {
      default: 
        type = BasicListDataComponent;
        break;
    }
    return type;
  }

  getDialog(): ComponentType<any> {
    let dialogType;
    switch(this.type) {
      default:
        dialogType = ListDialogBasicComponent
        break;
    }
    return dialogType;
  }

  openDialog() {
    this.dialog.open(this.getDialog()).afterClosed().subscribe((res: ListType | null) => {
      if (res !== null) {
        this.addItem(res);
      }
    });
  }

  wrap(item: ListType): ListData<ListType> {
    return new ListData(item);
  }
}
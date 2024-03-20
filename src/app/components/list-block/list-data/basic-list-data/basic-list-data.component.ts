import { Component } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Basic } from './basic';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../list.service';
import { ListDialogBasicComponent } from '../../list-dialog/list-dialog-basic/list-dialog-basic.component';
import { ComponentType } from '@angular/cdk/portal';
import { AbstractListDialog } from '../../list-dialog/abstract-list-dialog';
import { ListType } from '../list-type';

@Component({
  selector: 'app-basic-list-data',
  templateUrl: './basic-list-data.component.html',
  styleUrls: ['./basic-list-data.component.less']
})
export class BasicListDataComponent extends AbstractListData<Basic> {
  constructor(dialog: MatDialog, listService: ListService) {
    super(dialog, listService);
  }

  protected override listDialog(): ComponentType<AbstractListDialog<ListType>> {
    return ListDialogBasicComponent;
  }

  protected override header(): string {
    return this.data.data.val;
  }

  protected override deleteCallback(): void { }
}

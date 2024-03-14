import { Component } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Basic } from './basic';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../list.service';
import { ListDialogBasicComponent } from '../../list-dialog/list-dialog-basic/list-dialog-basic.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-basic-list-data',
  templateUrl: './basic-list-data.component.html',
  styleUrls: ['./basic-list-data.component.less']
})
export class BasicListDataComponent extends AbstractListData<Basic> {
  constructor(dialog: MatDialog, listService: ListService) {
    super(dialog, listService);
  }

  openDialog() {
    this.dialog.open(ListDialogBasicComponent, {
      data: {
        header: this.data.data.val,
        edit: false,
        index: this.index
      }
    }).afterClosed().pipe(takeUntil(this.onDestroyed)).subscribe((item) => {
      console.log(item);
    });
  }

  openEditDialog() {
    this.dialog.open(ListDialogBasicComponent, {
      data: {
        header: `Edit ${this.data.data.val}`,
        edit: true,
        index: this.index
      }
    }).afterClosed().pipe(takeUntil(this.onDestroyed)).subscribe((item) => {
      console.log(item)
    });
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Basic } from './basic';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-basic-list-data',
  templateUrl: './basic-list-data.component.html',
  styleUrls: ['./basic-list-data.component.less']
})
export class BasicListDataComponent extends AbstractListData<Basic> {
  constructor(private readonly dialog: MatDialog, listService: ListService) {
    super(listService);
  }

  onDelete() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        header: 'Delete item',
        content: 'Are you sure you want to delete this?'
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) this.listService.remove(this.index);
    })
  }
}

import { Component } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Feat } from 'src/app/domain/feat';
import { ComponentType } from '@angular/cdk/portal';
import { AbstractListDialog } from '../../list-dialog/abstract-list-dialog';
import { ListType } from '../list-type';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../list.service';
import { ListDialogFeatComponent } from '../../list-dialog/list-dialog-feat/list-dialog-feat.component';

@Component({
  selector: 'app-feat-list-data',
  templateUrl: './feat-list-data.component.html',
  styleUrls: ['./feat-list-data.component.less']
})
export class FeatListDataComponent extends AbstractListData<Feat> {

  description(): string[] {
    return this.data.data.description.split('\n');
  }

  constructor(dialog: MatDialog, listService: ListService) {
    super(dialog, listService);
  }

  protected override listDialog(): ComponentType<AbstractListDialog<ListType>> {
    return ListDialogFeatComponent;
  }

  protected override header(): string {
    return this.data.data.name;
  }

  protected override deleteCallback(): void { }
}

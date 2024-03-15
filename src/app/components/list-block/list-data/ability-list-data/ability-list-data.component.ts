import { Component } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Ability } from 'src/app/domain/ability';
import { ComponentType } from '@angular/cdk/portal';
import { AbstractListDialog } from '../../list-dialog/abstract-list-dialog';
import { ListType } from '../list-type';
import { ListDialogAbilityComponent } from '../../list-dialog/list-dialog-ability/list-dialog-ability.component';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-ability-list-data',
  templateUrl: './ability-list-data.component.html',
  styleUrls: ['./ability-list-data.component.less']
})
export class AbilityListDataComponent extends AbstractListData<Ability> {

  constructor(dialog: MatDialog, listService: ListService) {
    super(dialog, listService);
  }

  description(): string[] {
    return this.data.data.description.split('\n');
  }

  charged(index: number) {
    return index < this.data.data.charges;
  }

  expend() {
    this.data.data.use();
  }

  recharge() {
    this.data.data.recharge(1);
  }

  rounds() {
    const a = [];
    for (let i = 0; i < this.data.data.maxCharge; i++) {
      a.push(i);
    }
    return a;
  }

  protected override listDialog(): ComponentType<AbstractListDialog<ListType>> {
    return ListDialogAbilityComponent;
  }

  protected override header(): string {
    return this.data.data.name;
  }
}

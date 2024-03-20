import { MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Directive } from '@angular/core';
import { ListType } from '../list-data/list-type';

export type DialogData<T extends ListType> = {header: string, edit: boolean, index: number, val?: T};

@Directive()
export abstract class AbstractListDialog<T extends ListType> implements AfterViewInit {

  val?: T;
  header: string;
  edit: boolean;
  index: number;

  constructor(
    private readonly ref: MatDialogRef<AbstractListDialog<T>>,
    data: DialogData<T>
  ) {
    this.val = data.val;
    this.header = data.header;
    this.edit = data.edit;
    this.index = data.index;
  }

  ngAfterViewInit(): void {
    this.loadEdit();
  }

  abstract canSubmit(): boolean;

  abstract createListType(): T;

  abstract setValues(): void;

  confirm() {
    const t = this.createListType();
    setTimeout(() => this.ref.close(t), 100);
  }

  cancel() {
    setTimeout(() => this.ref.close(null), 100);
  }

  loadEdit() {
    if (this.val !== undefined) this.setValues();
  }
}

import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from "@angular/core";
import { ListData } from "../list-data";
import { ListService } from "../list.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { Subject, takeUntil } from "rxjs";
import { AbstractListDialog } from "../list-dialog/abstract-list-dialog";
import { ComponentType } from "@angular/cdk/portal";
import { ListType } from "./list-type";

@Directive()
export abstract class AbstractListData<T extends ListType> implements OnDestroy {
  @HostBinding('style') style = {
    'width': '100%',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'margin': 0
  }

  @Input() listId!: number;
  @Input() data!: ListData<T>;
  @Input() index!: number;

  hovering: boolean = false;

  @HostListener('mouseenter')
  onHover() {
    this.hovering = true;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.hovering = false;
  }

  constructor(
    protected readonly dialog: MatDialog,
    protected readonly listService: ListService
  ) { }

  protected abstract listDialog(): ComponentType<AbstractListDialog<ListType>>;

  protected abstract header(): string;

  onDestroyed = new Subject<void>;
  ngOnDestroy(): void {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }

  onDelete() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        header: 'Delete Item',
        content: 'Are you sure you want to delete this?'
      }
    }).afterClosed().pipe(takeUntil(this.onDestroyed)).subscribe((res: boolean) => {
      if (res) this.listService.remove(this.index, this.listId);
      this.deleteCallback(res);
    })
  }

  openDialog() {
    this.dialog.open(this.listDialog(), {
      data: {
        header: this.header(),
        edit: false,
        index: this.index,
        val: this.data.data
      }
    });
  }

  openEditDialog() {
    this.dialog.open(this.listDialog(), {
      data: {
        header: `Edit ${this.header()}`,
        edit: true,
        index: this.index,
        val: this.data.data
      }
    }).afterClosed().pipe(takeUntil(this.onDestroyed)).subscribe((item) => {
      this.data.data.from(item);
      this.listService.update(this.data.data, this.index, this.listId);
    });
  }

  protected deleteCallback(res: boolean): void {}
}
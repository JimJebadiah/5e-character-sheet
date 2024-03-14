import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from "@angular/core";
import { ListData } from "../list-data";
import { ListType } from "../list-block.component";
import { ListService } from "../list.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { Subject, takeUntil } from "rxjs";

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

  protected deleteCallback(res: boolean): void {}
}
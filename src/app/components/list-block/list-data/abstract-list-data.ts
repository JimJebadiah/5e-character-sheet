import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";
import { ListData } from "../list-data";
import { ListType } from "../list-block.component";
import { ListService } from "../list.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";

@Directive()
export abstract class AbstractListData<T extends ListType> {
  @HostBinding('style') style = {
    'width': '100%',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'margin': 0
  }

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

  onDelete() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        header: 'Delete Item',
        content: 'Are you sure you want to delete this?'
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) this.listService.remove(this.index);
      this.deleteCallback(res);
    })
  }

  protected deleteCallback(res: boolean): void {}
}
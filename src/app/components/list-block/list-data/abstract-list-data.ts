import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";
import { ListData } from "../list-data";
import { ListType } from "../list-block.component";
import { ListService } from "../list.service";

@Directive()
export class AbstractListData<T extends ListType> {
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
    protected readonly listService: ListService
  ) { }
}
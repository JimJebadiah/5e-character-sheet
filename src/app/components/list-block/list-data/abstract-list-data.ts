import { Directive, HostBinding, Input } from "@angular/core";
import { ListData } from "../list-data";
import { ListType } from "../list-block.component";

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
}
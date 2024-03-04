import { EditableNumberDialogComponent } from './../../components/editable-number-dialog/editable-number-dialog.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from 'src/app/domain/hero';

export type Setter = (val: number) => void;
export type Getter = () => number;

@Directive({
  selector: '[appEditableNumber]'
})
export class EditableNumberDirective {

  @HostListener('click')
  onClick() {
    this.open();
  }

  @HostListener('mouseenter')
  onEnter() {
    this.ref.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.ref.nativeElement.style.cursor = 'auto';
  }

  @Input() setter!: Setter;
  @Input() getter!: Getter;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly ref: ElementRef
  ) {}

  open() {
    this.matDialog.open(EditableNumberDialogComponent, {
      data: {
        getter: this.getter,
        setter: this.setter
      }
    });
  }

}

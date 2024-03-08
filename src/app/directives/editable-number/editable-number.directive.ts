import { Renderer2 } from '@angular/core';
import { EditableNumberDialogComponent } from '../../components/editable-dialog/editable-number-dialog/editable-number-dialog.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from 'src/app/domain/hero';
import { AbstractEditableDirective } from '../abstract-editable-directive';
import { ComponentType } from '@angular/cdk/portal';
import { GitdbService } from 'src/app/services/gitdb.service';

export type Setter<T> = (val: T) => void;
export type Getter<T> = () => T;

@Directive({
  selector: '[appEditableNumber]'
})
export class EditableNumberDirective extends AbstractEditableDirective<number> {

  @Input() step: number = 1;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() min: number = Number.MIN_SAFE_INTEGER;

  constructor(
    ref: ElementRef,
    renderer: Renderer2,
    matDialog: MatDialog,
  ) {
    super(ref, renderer, matDialog);
  }

  protected override dialog(): ComponentType<any> {
    return EditableNumberDialogComponent;
  }

  protected override data() {
    return {
      ...super.data(),
      step: this.step,
      max: this.max,
      min: this.min
    }
  }

  override getter(): Getter<number> {
    return this.hero!.getNumber(this.field!);
  }

  override setter(): Setter<number> {
    return this.hero!.setNumber(this.field!);
  }
}

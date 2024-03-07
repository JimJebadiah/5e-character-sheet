import { EditableNumberStepDialogComponent } from './../../components/editable-dialog/editable-number-step-dialog/editable-number-step-dialog.component';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractEditableDirective } from '../abstract-editable-directive';
import { ComponentType } from '@angular/cdk/portal';
import { Getter, Setter } from '../editable-number/editable-number.directive';

export type StepOptions = 'add' | 'sub';

@Directive({
  selector: '[appEditableNumberStep]'
})
export class EditableNumberStepDirective extends AbstractEditableDirective<number> {

  @Input() stepDirection: StepOptions = 'add';
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  constructor(
    ref: ElementRef,
    renderer: Renderer2,
    matDialog: MatDialog
  ) {
    super(ref, renderer, matDialog);
  }

  protected override dialog(): ComponentType<any> {
    return EditableNumberStepDialogComponent;
  }

  override getter(): Getter<number> {
    return this.hero!.getNumber(this.field!);
  }

  override setter(): Setter<number> {
    return (val: number) => {
      const curr = this.stepDirection === 'add' ? this.add(val) : this.sub(val);
      this.hero?.setNumber(this.field!).call(this.hero, curr);
    }
  }

  private add(val: number): number {
    let curr = this.hero!.getNumber(this.field!).call(this.hero);
    curr += val;
    if (curr > this.max) curr = this.max;
    return curr;
  }

  private sub(val: number): number {
    let curr = this.hero!.getNumber(this.field!).call(this.hero);
    curr -= val;
    if (curr < this.min) curr = this.min;
    return curr;
  }
}

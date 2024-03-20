/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AbstractEditableDirective } from '../abstract-editable-directive';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { EditableStringDialogComponent } from 'src/app/components/editable-dialog/editable-string-dialog/editable-string-dialog.component';
import { Getter, Setter } from '../editable-number/editable-number.directive';

@Directive({
  selector: '[appEditableString]'
})
export class EditableStringDirective extends AbstractEditableDirective<string> {
  constructor(
    ref: ElementRef,
    renderer: Renderer2,
    matDialog: MatDialog,
  ) {
    super(ref, renderer, matDialog);
  }

  protected override dialog(): ComponentType<any> {
    return EditableStringDialogComponent;
  }

  override getter(): Getter<string> {
    return this.hero!.getString(this.field!);
  }

  override setter(): Setter<string> {
    return this.hero!.setString(this.field!);
  }
}

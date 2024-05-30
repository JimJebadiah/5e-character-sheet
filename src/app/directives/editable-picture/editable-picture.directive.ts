import {Directive, ElementRef, Renderer2} from '@angular/core';
import {AbstractEditableDirective} from '../abstract-editable-directive';
import {ComponentType} from '@angular/cdk/portal';
import {Getter, Setter} from '../editable-number/editable-number.directive';
import {EditablePictureComponent} from '../../components/editable-dialog/editable-picture/editable-picture.component';
import {MatDialog} from '@angular/material/dialog';

@Directive({
  selector: '[appEditablePicture]'
})
export class EditablePictureDirective extends AbstractEditableDirective<string>{

  constructor(
    ref: ElementRef,
    renderer: Renderer2,
    matDialog: MatDialog,
  ) {
    super(ref, renderer, matDialog);
  }

  protected dialog(): ComponentType<EditablePictureComponent> {
    return EditablePictureComponent;
  }

  getter(): Getter<string> {
    return () => '';
  }

  setter(): Setter<string> {
    return () => {};
  }

}

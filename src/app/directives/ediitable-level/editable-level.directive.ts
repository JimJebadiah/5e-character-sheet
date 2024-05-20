/* eslint-disable @typescript-eslint/no-explicit-any */

import {Directive, ElementRef, Renderer2} from '@angular/core';
import {AbstractEditableDirective} from '../abstract-editable-directive';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {Getter, Setter} from '../editable-number/editable-number.directive';
import {Attributes} from '../../domain/attribute';
import {
  EditableLevelDialogComponent
} from '../../components/editable-dialog/editable-level-dialog/editable-level-dialog.component';

@Directive({
  selector: '[appEditableLevel]'
})
export class EditableLevelDirective extends AbstractEditableDirective<number[]> {

  constructor(
    ref: ElementRef,
    renderer: Renderer2,
    matDialog: MatDialog,
  ) {
    super(ref, renderer, matDialog);
  }

  protected override dialog(): ComponentType<any> {
    return EditableLevelDialogComponent;
  }

  override getter(): Getter<number[]> {
    return () => [this.hero!.level + 1, 1, 0];
  }

  override setter(): Setter<number[]> {
    return ([level, maxHp, prof]) => {
      this.hero!.level = level;
      this.hero.proficiencyBonus += prof;
      this.hero.maxHp += maxHp + this.hero.getAttrMod(Attributes.CON);
      this.hero.recover().call(this.hero, maxHp + this.hero.getAttrMod(Attributes.CON));
    };
  }
}

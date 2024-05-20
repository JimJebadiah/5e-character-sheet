import {Component, Inject, OnInit} from '@angular/core';
import {AbstractEditableDialog} from '../abstract-editable-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Getter, Setter} from '../../../directives/editable-number/editable-number.directive';
import {Hero} from '../../../domain/hero';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editable-level-dialog',
  templateUrl: './editable-level-dialog.component.html',
  styleUrl: './editable-level-dialog.component.less'
})
export class EditableLevelDialogComponent extends AbstractEditableDialog<number[], EditableLevelDialogComponent> implements OnInit{

  group: FormGroup;
  profInc: FormControl<boolean | null>;

  constructor(
    ref: MatDialogRef<EditableLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {getter: Getter<number[]>, setter: Setter<number[]>, hero: Hero},
    fb: FormBuilder,
  ) {
    super(ref, data);
    this.profInc = fb.control(false);
    this.group = fb.group({
      'profInc': this.profInc
    });
  }

  ngOnInit() {
    this.profInc.valueChanges.subscribe((v) => {
      this.value[2] = (v ?? false) ? 1 : 0;
    });
  }

  updateHp(u: string): void {
    this.value[1] = Number.parseInt(u);
  }
}

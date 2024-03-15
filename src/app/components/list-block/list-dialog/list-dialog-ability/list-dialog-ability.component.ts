import { Component, Inject } from '@angular/core';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';
import { Ability } from 'src/app/domain/ability';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog-ability',
  templateUrl: './list-dialog-ability.component.html',
  styleUrls: ['./list-dialog-ability.component.less']
})
export class ListDialogAbilityComponent extends AbstractListDialog<Ability> {

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogAbilityComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Ability>
  ) { 
    super(ref, data);
  }

  override canSubmit(): boolean {
    return true;
  }

  override createListType(): Ability {
    return new Ability({
      name: '',
      description: '',
      charges: 0,
      chargeModifier: 0,
      rechargeOn: 'long'
    });
  }

  override setValues(): void {
    
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractListDialog, DialogData } from '../abstract-list-dialog';
import { Feat } from 'src/app/domain/feat';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListDialogItemComponent } from '../list-dialog-item/list-dialog-item.component';

@Component({
  selector: 'app-list-dialog-feat',
  templateUrl: './list-dialog-feat.component.html',
  styleUrls: ['./list-dialog-feat.component.less']
})
export class ListDialogFeatComponent extends AbstractListDialog<Feat> implements OnInit {

  group: FormGroup;
  name: FormControl;
  description: FormControl;

  nameV: string = '';
  descriptionV: string = '';

  constructor(
    fb: FormBuilder,
    ref: MatDialogRef<ListDialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<Feat>
  ) { 
    super(ref, data);
    this.name = fb.control('', [Validators.required]);
    this.description = fb.control('', [Validators.required]);

    this.group = fb.group({
      'name': this.name,
      'description': this.description
    });
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((v) => {
      this.nameV = v;
    });

    this.description.valueChanges.subscribe((v) => {
      this.descriptionV = v;
    });

    this.loadEdit();
  }

  descriptionStrings(): string[] {
    return this.descriptionV.split('\n');
  }

  override canSubmit(): boolean {
    return !this.name.hasError('required') && !this.description.hasError('required');
  }

  override createListType(): Feat {
    return new Feat({name: this.nameV, description: this.descriptionV});
  }

  override setValues(): void {
    this.name.setValue(this.val!.name);
    this.description.setValue(this.val!.description);
  }
}

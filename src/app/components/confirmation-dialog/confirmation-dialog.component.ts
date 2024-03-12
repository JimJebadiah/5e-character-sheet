import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type ConfirmationData = {header: string, content: string}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class ConfirmationDialogComponent {

  header: string = '';
  content: string = '';

  constructor(
    private readonly ref: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmationData,
  ) { 
    this.header = data.header;
    this.content = data.content;
  }

  confirm() {
    setTimeout(() => this.ref.close(true), 100);
  }

  cancel() {
    setTimeout(() => this.ref.close(false), 100);
  }
}

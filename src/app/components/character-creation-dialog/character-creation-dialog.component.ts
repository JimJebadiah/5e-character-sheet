import { Component } from '@angular/core';

@Component({
  selector: 'app-character-creation-dialog',
  templateUrl: './character-creation-dialog.component.html',
  styleUrl: './character-creation-dialog.component.less'
})
export class CharacterCreationDialogComponent {

  cancel() {

  }

  confirm() {

  }

  canConfirm(): boolean {
    return true;
  }
}

import { Directive, HostListener, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Getter, Setter } from "src/app/directives/editable-number/editable-number.directive";
import { EditableNumberDialogComponent } from "./editable-number-dialog/editable-number-dialog.component";
import { Observable, of } from "rxjs";

@Directive()
export abstract class AbstractEditableDialog<T, R> {
  getter!: Getter<T>;
  setter!: Setter<T>;

  value: T;


  @HostListener('document:keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.confirm();
    }
  }

  constructor(
    private readonly ref: MatDialogRef<R>,
    data: {getter: Getter<T>, setter: Setter<T>}
  ) {
    this.getter = data.getter;
    this.setter = data.setter;
    this.value = this.getter();
  }

  confirm() {
    this.setter(this.value);
    this.cancel();
  }

  cancel() {
    setTimeout(() => this.ref.close(), 100);
  }

  canSubmit(): boolean {
    return true;
  }
}

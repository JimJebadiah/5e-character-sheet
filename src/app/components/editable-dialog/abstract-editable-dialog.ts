import { Directive, HostListener, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Getter, Setter } from 'src/app/directives/editable-number/editable-number.directive';
import { GitdbService } from 'src/app/services/gitdb.service';
import { Hero } from 'src/app/domain/hero';

@Directive()
export abstract class AbstractEditableDialog<T, R> {
  getter!: Getter<T>;
  setter!: Setter<T>;

  private readonly dbService: GitdbService = inject(GitdbService);

  value: T;
  hero!: Hero;

  @HostListener('document:keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.confirm();
    }
  }

  constructor(
    private readonly ref: MatDialogRef<R>,
    data: {getter: Getter<T>, setter: Setter<T>, hero: Hero},
  ) {
    this.getter = data.getter;
    this.setter = data.setter;
    this.value = this.getter();
    this.hero = data.hero;
  }

  confirm() {
    this.setter(this.value);
    this.dbService.update(this.hero);
    this.cancel();
  }

  cancel() {
    setTimeout(() => this.ref.close(), 100);
  }

  canSubmit(): boolean {
    return true;
  }
}

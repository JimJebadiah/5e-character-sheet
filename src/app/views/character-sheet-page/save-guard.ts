import { CanDeactivateFn } from '@angular/router';
import { CharacterSheetPageComponent } from './character-sheet-page.component';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { GitdbService } from 'src/app/services/gitdb.service';

export const saveGuard: CanDeactivateFn<CharacterSheetPageComponent> = () => {
  const service = inject(GitdbService);
  return service.saving$.pipe(map((s) => {
    console.log(s);
    if (s) {
      const res = confirm('Are you sure you want to exit? The sheet is still saving');
      return res;
    }
    return true;
  }));
};

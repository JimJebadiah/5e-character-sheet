import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { map, take } from "rxjs";
import { GitdbService } from "src/app/services/gitdb.service";

export const noTokenGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const service = inject(GitdbService);
    return service.token$.pipe(take(1), map((token) => {
        if (token === '') return createUrlTreeFromSnapshot(route, ['token']);
        return true;
    }));
  };
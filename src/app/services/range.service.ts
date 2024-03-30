import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service used for reloading weapons
 */
@Injectable({
  providedIn: 'root'
})
export class RangeService {

  readonly reloadSubject: Subject<string> = new Subject();
  readonly reaload$ = this.reloadSubject.asObservable();

  readonly statusSubject: Subject<string> = new Subject();
  readonly status$ = this.statusSubject.asObservable();

  readonly fireSubject: Subject<string> = new Subject();
  readonly fire$ = this.fireSubject.asObservable();

  constructor() { }
}

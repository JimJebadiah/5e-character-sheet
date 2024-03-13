import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly removeSubject = new Subject<number[]>();
  remove$ = this.removeSubject.asObservable();

  constructor() { }

  remove(index: number, listId: number) {
    this.removeSubject.next([index, listId]);
  }
}

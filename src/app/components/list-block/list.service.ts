/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListType } from './list-data/list-type';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly removeSubject = new Subject<number[]>();
  remove$ = this.removeSubject.asObservable();

  private readonly updateSubject = new Subject<any[]>();
  update$ = this.updateSubject.asObservable();

  constructor() { }

  remove(index: number, listId: number) {
    this.removeSubject.next([index, listId]);
  }

  update(item: ListType, index: number, listId: number) {
    this.updateSubject.next([item, index, listId]);
  }
}

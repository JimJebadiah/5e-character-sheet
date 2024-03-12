import { Component, OnInit } from '@angular/core';
import { AbstractListData } from '../abstract-list-data';
import { Basic } from './basic';

@Component({
  selector: 'app-basic-list-data',
  templateUrl: './basic-list-data.component.html',
  styleUrls: ['./basic-list-data.component.less']
})
export class BasicListDataComponent extends AbstractListData<Basic> {
  
}

import { Component, Input, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListType } from 'src/app/components/list-block/list-block.component';
import { Hero } from 'src/app/domain/hero';
import { Item } from 'src/app/domain/item';

@Component({
  selector: 'app-inventory-block',
  templateUrl: './inventory-block.component.html',
  styleUrls: ['./inventory-block.component.less']
})
export class InventoryBlockComponent implements OnInit{
  @Input() hero!: Hero;
  items: Item[] = [];

  inventoryType: Type<ListType> = Item;

  constructor(
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.items = this.hero.inventory;
  }
}

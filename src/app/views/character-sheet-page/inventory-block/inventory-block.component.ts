import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.items = this.hero.inventory;
  }
}

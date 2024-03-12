import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
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

  constructor(
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.items = this.hero.inventory;
  }

  add(item: Item) {
    item.increment();
  }

  remove(item: Item, index: number) {
    item.decrement();
    if (item.count === 0) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          header: 'Remove Item?',
          content: `Do you want to remove ${item.name}?`,
        }
      }).afterClosed().subscribe((res) => {
        if (res) this.items.splice(index, 1);
        else item.increment();
      });
    }
  }
}

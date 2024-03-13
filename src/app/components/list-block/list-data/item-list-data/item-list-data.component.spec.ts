import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListDataComponent } from './item-list-data.component';

describe('ItemListDataComponent', () => {
  let component: ItemListDataComponent;
  let fixture: ComponentFixture<ItemListDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListDataComponent]
    });
    fixture = TestBed.createComponent(ItemListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

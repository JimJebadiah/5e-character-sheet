import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBlockComponent } from './inventory-block.component';

describe('InventoryBlockComponent', () => {
  let component: InventoryBlockComponent;
  let fixture: ComponentFixture<InventoryBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryBlockComponent]
    });
    fixture = TestBed.createComponent(InventoryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

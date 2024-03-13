import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDialogBasicComponent } from './list-dialog-basic.component';

describe('ListDialogBasicComponent', () => {
  let component: ListDialogBasicComponent;
  let fixture: ComponentFixture<ListDialogBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDialogBasicComponent]
    });
    fixture = TestBed.createComponent(ListDialogBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

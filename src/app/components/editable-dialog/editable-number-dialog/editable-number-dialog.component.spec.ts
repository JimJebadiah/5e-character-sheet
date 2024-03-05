import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableNumberDialogComponent } from './editable-number-dialog.component';

describe('EditableNumberDialogComponent', () => {
  let component: EditableNumberDialogComponent;
  let fixture: ComponentFixture<EditableNumberDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableNumberDialogComponent]
    });
    fixture = TestBed.createComponent(EditableNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

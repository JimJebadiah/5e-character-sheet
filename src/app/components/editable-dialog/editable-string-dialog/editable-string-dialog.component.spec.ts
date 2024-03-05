import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableStringDialogComponent } from './editable-string-dialog.component';

describe('EditableStringDialogComponent', () => {
  let component: EditableStringDialogComponent;
  let fixture: ComponentFixture<EditableStringDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableStringDialogComponent]
    });
    fixture = TestBed.createComponent(EditableStringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

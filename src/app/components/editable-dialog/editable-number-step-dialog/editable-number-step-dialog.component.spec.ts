import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableNumberStepDialogComponent } from './editable-number-step-dialog.component';

describe('EditableNumberStepDialogComponent', () => {
  let component: EditableNumberStepDialogComponent;
  let fixture: ComponentFixture<EditableNumberStepDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableNumberStepDialogComponent]
    });
    fixture = TestBed.createComponent(EditableNumberStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

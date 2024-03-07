import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisBlockComponent } from './ais-block.component';

describe('AisBlockComponent', () => {
  let component: AisBlockComponent;
  let fixture: ComponentFixture<AisBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AisBlockComponent]
    });
    fixture = TestBed.createComponent(AisBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

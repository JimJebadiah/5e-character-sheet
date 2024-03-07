import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpBlockComponent } from './hp-block.component';

describe('HpBlockComponent', () => {
  let component: HpBlockComponent;
  let fixture: ComponentFixture<HpBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HpBlockComponent]
    });
    fixture = TestBed.createComponent(HpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

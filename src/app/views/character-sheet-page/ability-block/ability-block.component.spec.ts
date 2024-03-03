import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityBlockComponent } from './ability-block.component';

describe('AbilityBlockComponent', () => {
  let component: AbilityBlockComponent;
  let fixture: ComponentFixture<AbilityBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityBlockComponent]
    });
    fixture = TestBed.createComponent(AbilityBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

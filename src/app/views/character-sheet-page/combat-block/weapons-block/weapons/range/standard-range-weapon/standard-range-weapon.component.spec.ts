import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRangeWeaponComponent } from './standard-range-weapon.component';

describe('StandardRangeWeaponComponent', () => {
  let component: StandardRangeWeaponComponent;
  let fixture: ComponentFixture<StandardRangeWeaponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandardRangeWeaponComponent]
    });
    fixture = TestBed.createComponent(StandardRangeWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

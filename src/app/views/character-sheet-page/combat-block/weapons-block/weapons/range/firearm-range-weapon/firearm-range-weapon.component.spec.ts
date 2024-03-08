import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmRangeWeaponComponent } from './firearm-range-weapon.component';

describe('FirearmRangeWeaponComponent', () => {
  let component: FirearmRangeWeaponComponent;
  let fixture: ComponentFixture<FirearmRangeWeaponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirearmRangeWeaponComponent]
    });
    fixture = TestBed.createComponent(FirearmRangeWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

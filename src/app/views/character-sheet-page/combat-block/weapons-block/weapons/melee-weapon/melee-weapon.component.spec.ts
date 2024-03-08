import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeleeWeaponComponent } from './melee-weapon.component';

describe('MeleeWeaponComponent', () => {
  let component: MeleeWeaponComponent;
  let fixture: ComponentFixture<MeleeWeaponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeleeWeaponComponent]
    });
    fixture = TestBed.createComponent(MeleeWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

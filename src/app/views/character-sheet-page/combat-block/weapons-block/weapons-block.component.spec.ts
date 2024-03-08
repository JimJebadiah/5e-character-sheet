import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsBlockComponent } from './weapons-block.component';

describe('WeaponsBlockComponent', () => {
  let component: WeaponsBlockComponent;
  let fixture: ComponentFixture<WeaponsBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeaponsBlockComponent]
    });
    fixture = TestBed.createComponent(WeaponsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

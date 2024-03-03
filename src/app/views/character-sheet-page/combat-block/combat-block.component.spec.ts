import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatBlockComponent } from './combat-block.component';

describe('CombatBlockComponent', () => {
  let component: CombatBlockComponent;
  let fixture: ComponentFixture<CombatBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombatBlockComponent]
    });
    fixture = TestBed.createComponent(CombatBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

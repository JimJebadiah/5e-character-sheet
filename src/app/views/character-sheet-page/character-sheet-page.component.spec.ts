import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetPageComponent } from './character-sheet-page.component';

describe('CharacterSheetPageComponent', () => {
  let component: CharacterSheetPageComponent;
  let fixture: ComponentFixture<CharacterSheetPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSheetPageComponent]
    });
    fixture = TestBed.createComponent(CharacterSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

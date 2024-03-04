import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeBlockComponent } from './attribute-block.component';

describe('AttributeBlockComponent', () => {
  let component: AttributeBlockComponent;
  let fixture: ComponentFixture<AttributeBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeBlockComponent]
    });
    fixture = TestBed.createComponent(AttributeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

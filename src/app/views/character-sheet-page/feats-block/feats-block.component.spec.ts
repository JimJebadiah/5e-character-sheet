import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatsBlockComponent } from './feats-block.component';

describe('FeatsBlockComponent', () => {
  let component: FeatsBlockComponent;
  let fixture: ComponentFixture<FeatsBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatsBlockComponent]
    });
    fixture = TestBed.createComponent(FeatsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

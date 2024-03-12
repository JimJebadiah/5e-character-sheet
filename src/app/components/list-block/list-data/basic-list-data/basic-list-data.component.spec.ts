import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicListDataComponent } from './basic-list-data.component';

describe('BasicListDataComponent', () => {
  let component: BasicListDataComponent;
  let fixture: ComponentFixture<BasicListDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicListDataComponent]
    });
    fixture = TestBed.createComponent(BasicListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

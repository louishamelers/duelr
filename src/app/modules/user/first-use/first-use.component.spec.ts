import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstUseComponent } from './first-use.component';

describe('FirstUseComponent', () => {
  let component: FirstUseComponent;
  let fixture: ComponentFixture<FirstUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

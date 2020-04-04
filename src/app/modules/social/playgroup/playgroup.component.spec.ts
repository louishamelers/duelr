import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroupComponent } from './playgroup.component';

describe('PlaygroupComponent', () => {
  let component: PlaygroupComponent;
  let fixture: ComponentFixture<PlaygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

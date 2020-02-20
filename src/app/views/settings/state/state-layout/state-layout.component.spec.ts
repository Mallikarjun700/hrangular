import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLayoutComponent } from './state-layout.component';

describe('StateLayoutComponent', () => {
  let component: StateLayoutComponent;
  let fixture: ComponentFixture<StateLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

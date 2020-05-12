import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LwfListComponent } from './lwf-list.component';

describe('LwfListComponent', () => {
  let component: LwfListComponent;
  let fixture: ComponentFixture<LwfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LwfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LwfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

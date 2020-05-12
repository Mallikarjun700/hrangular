import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LwfViewComponent } from './lwf-view.component';

describe('LwfViewComponent', () => {
  let component: LwfViewComponent;
  let fixture: ComponentFixture<LwfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LwfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LwfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LwfAddComponent } from './lwf-add.component';

describe('LwfAddComponent', () => {
  let component: LwfAddComponent;
  let fixture: ComponentFixture<LwfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LwfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LwfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

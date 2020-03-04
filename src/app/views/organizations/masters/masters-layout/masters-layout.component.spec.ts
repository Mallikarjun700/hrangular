import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersLayoutComponent } from './masters-layout.component';

describe('MastersLayoutComponent', () => {
  let component: MastersLayoutComponent;
  let fixture: ComponentFixture<MastersLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

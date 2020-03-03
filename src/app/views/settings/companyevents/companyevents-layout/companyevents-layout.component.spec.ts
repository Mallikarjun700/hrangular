import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyeventsLayoutComponent } from './companyevents-layout.component';

describe('CompanyeventsLayoutComponent', () => {
  let component: CompanyeventsLayoutComponent;
  let fixture: ComponentFixture<CompanyeventsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyeventsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyeventsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

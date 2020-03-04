import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofileLayoutComponent } from './companyprofile-layout.component';

describe('CompanyprofileLayoutComponent', () => {
  let component: CompanyprofileLayoutComponent;
  let fixture: ComponentFixture<CompanyprofileLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyprofileLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyprofileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

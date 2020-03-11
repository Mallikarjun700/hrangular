import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyProfileComponent } from './addCompanyProfile.component';

describe('AddCompanyProfileComponent', () => {
  let component: AddCompanyProfileComponent;
  let fixture: ComponentFixture<AddCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

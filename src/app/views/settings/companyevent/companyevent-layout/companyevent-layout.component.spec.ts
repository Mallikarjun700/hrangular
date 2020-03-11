import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyeventLayoutComponent } from './companyevent-layout.component';

describe('CompanyeventLayoutComponent', () => {
  let component: CompanyeventLayoutComponent;
  let fixture: ComponentFixture<CompanyeventLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyeventLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyeventLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

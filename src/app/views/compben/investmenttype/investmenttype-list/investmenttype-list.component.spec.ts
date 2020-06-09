import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmenttypeListComponent } from './investmenttype-list.component';

describe('InvestmenttypeListComponent', () => {
  let component: InvestmenttypeListComponent;
  let fixture: ComponentFixture<InvestmenttypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmenttypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmenttypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

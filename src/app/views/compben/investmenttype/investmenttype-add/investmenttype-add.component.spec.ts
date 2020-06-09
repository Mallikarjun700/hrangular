import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmenttypeAddComponent } from './investmenttype-add.component';

describe('InvestmenttypeAddComponent', () => {
  let component: InvestmenttypeAddComponent;
  let fixture: ComponentFixture<InvestmenttypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmenttypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmenttypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

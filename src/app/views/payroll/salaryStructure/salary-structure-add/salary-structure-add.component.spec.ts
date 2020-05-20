import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStructureAddComponent } from './salary-structure-add.component';

describe('SalaryStructureAddComponent', () => {
  let component: SalaryStructureAddComponent;
  let fixture: ComponentFixture<SalaryStructureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryStructureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryStructureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

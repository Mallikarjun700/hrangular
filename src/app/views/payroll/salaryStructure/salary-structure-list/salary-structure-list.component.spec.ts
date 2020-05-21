import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStructureListComponent } from './salary-structure-list.component';

describe('SalaryStructureListComponent', () => {
  let component: SalaryStructureListComponent;
  let fixture: ComponentFixture<SalaryStructureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryStructureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryStructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

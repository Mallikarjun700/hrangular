import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionaltaxListComponent } from './professionaltax-list.component';

describe('ProfessionaltaxListComponent', () => {
  let component: ProfessionaltaxListComponent;
  let fixture: ComponentFixture<ProfessionaltaxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionaltaxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionaltaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

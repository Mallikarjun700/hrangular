import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionaltaxViewComponent } from './professionaltax-view.component';

describe('ProfessionaltaxViewComponent', () => {
  let component: ProfessionaltaxViewComponent;
  let fixture: ComponentFixture<ProfessionaltaxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionaltaxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionaltaxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

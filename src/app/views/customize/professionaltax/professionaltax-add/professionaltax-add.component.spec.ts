import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionaltaxAddComponent } from './professionaltax-add.component';

describe('ProfessionaltaxAddComponent', () => {
  let component: ProfessionaltaxAddComponent;
  let fixture: ComponentFixture<ProfessionaltaxAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionaltaxAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionaltaxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

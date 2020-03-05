import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityLayoutComponent } from './city-layout.component';

describe('CityLayoutComponent', () => {
  let component: CityLayoutComponent;
  let fixture: ComponentFixture<CityLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

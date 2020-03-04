import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsLayoutComponent } from './organizations-layout.component';

describe('OrganizationsLayoutComponent', () => {
  let component: OrganizationsLayoutComponent;
  let fixture: ComponentFixture<OrganizationsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

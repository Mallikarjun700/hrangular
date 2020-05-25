import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocListComponent } from './adhoc-list.component';

describe('AdhocListComponent', () => {
  let component: AdhocListComponent;
  let fixture: ComponentFixture<AdhocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

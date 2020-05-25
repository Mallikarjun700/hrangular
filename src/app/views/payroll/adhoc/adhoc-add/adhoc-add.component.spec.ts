import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocAddComponent } from './adhoc-add.component';

describe('AdhocAddComponent', () => {
  let component: AdhocAddComponent;
  let fixture: ComponentFixture<AdhocAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiListComponent } from './esi-list.component';

describe('EsiListComponent', () => {
  let component: EsiListComponent;
  let fixture: ComponentFixture<EsiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

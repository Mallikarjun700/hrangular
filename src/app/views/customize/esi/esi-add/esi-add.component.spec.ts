import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiAddComponent } from './esi-add.component';

describe('EsiAddComponent', () => {
  let component: EsiAddComponent;
  let fixture: ComponentFixture<EsiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

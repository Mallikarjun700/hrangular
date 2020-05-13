import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentfundViewComponent } from './providentfund-view.component';

describe('ProvidentfundViewComponent', () => {
  let component: ProvidentfundViewComponent;
  let fixture: ComponentFixture<ProvidentfundViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidentfundViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidentfundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

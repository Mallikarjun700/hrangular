import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentfundListComponent } from './providentfund-list.component';

describe('ProvidentfundListComponent', () => {
  let component: ProvidentfundListComponent;
  let fixture: ComponentFixture<ProvidentfundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidentfundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidentfundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

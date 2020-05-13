import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidentfundAddComponent } from './providentfund-add.component';

describe('ProvidentfundAddComponent', () => {
  let component: ProvidentfundAddComponent;
  let fixture: ComponentFixture<ProvidentfundAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidentfundAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidentfundAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

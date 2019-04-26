import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmmodifypassComponent } from './hmmodifypass.component';

describe('HmmodifypassComponent', () => {
  let component: HmmodifypassComponent;
  let fixture: ComponentFixture<HmmodifypassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmmodifypassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmmodifypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

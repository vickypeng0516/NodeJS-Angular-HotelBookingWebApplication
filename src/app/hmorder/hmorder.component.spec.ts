import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmorderComponent } from './hmorder.component';

describe('HmorderComponent', () => {
  let component: HmorderComponent;
  let fixture: ComponentFixture<HmorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

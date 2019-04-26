import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmcompComponent } from './hmcomp.component';

describe('HmcompComponent', () => {
  let component: HmcompComponent;
  let fixture: ComponentFixture<HmcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

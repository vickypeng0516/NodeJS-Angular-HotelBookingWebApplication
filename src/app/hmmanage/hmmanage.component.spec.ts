import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmmanageComponent } from './hmmanage.component';

describe('HmmanageComponent', () => {
  let component: HmmanageComponent;
  let fixture: ComponentFixture<HmmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

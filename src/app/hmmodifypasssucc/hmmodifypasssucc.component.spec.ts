import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmmodifypasssuccComponent } from './hmmodifypasssucc.component';

describe('HmmodifypasssuccComponent', () => {
  let component: HmmodifypasssuccComponent;
  let fixture: ComponentFixture<HmmodifypasssuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmmodifypasssuccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmmodifypasssuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

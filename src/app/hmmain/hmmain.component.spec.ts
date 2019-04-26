import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HMmainComponent } from './hmmain.component';

describe('HMmainComponent', () => {
  let component: HMmainComponent;
  let fixture: ComponentFixture<HMmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HMmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HMmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

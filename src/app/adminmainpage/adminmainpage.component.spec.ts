import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmainpageComponent } from './adminmainpage.component';

describe('AdminmainpageComponent', () => {
  let component: AdminmainpageComponent;
  let fixture: ComponentFixture<AdminmainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

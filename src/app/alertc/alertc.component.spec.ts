import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertcComponent } from './alertc.component';

describe('AlertcComponent', () => {
  let component: AlertcComponent;
  let fixture: ComponentFixture<AlertcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

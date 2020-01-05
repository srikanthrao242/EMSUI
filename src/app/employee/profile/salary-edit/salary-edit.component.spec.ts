import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryEditComponent } from './salary-edit.component';

describe('SalaryEditComponent', () => {
  let component: SalaryEditComponent;
  let fixture: ComponentFixture<SalaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

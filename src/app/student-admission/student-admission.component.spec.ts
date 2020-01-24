import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionComponent } from './student-admission.component';

describe('StudentAdmissionComponent', () => {
  let component: StudentAdmissionComponent;
  let fixture: ComponentFixture<StudentAdmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAdmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

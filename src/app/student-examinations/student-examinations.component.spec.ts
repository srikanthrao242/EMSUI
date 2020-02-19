import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExaminationsComponent } from './student-examinations.component';

describe('StudentExaminationsComponent', () => {
  let component: StudentExaminationsComponent;
  let fixture: ComponentFixture<StudentExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

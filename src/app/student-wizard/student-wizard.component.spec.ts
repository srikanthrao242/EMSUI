import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWizardComponent } from './student-wizard.component';

describe('StudentWizardComponent', () => {
  let component: StudentWizardComponent;
  let fixture: ComponentFixture<StudentWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

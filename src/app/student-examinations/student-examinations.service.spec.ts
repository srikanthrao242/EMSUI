import { TestBed } from '@angular/core/testing';

import { StudentExaminationsService } from './student-examinations.service';

describe('StudentExaminationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentExaminationsService = TestBed.get(StudentExaminationsService);
    expect(service).toBeTruthy();
  });
});

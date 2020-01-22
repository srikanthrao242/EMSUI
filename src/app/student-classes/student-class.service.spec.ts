import { TestBed } from '@angular/core/testing';

import { StudentClassService } from './student-class.service';

describe('StudentClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentClassService = TestBed.get(StudentClassService);
    expect(service).toBeTruthy();
  });
});

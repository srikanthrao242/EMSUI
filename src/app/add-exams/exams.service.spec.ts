import { TestBed } from '@angular/core/testing';

import { ExamsService } from './exams.service';

describe('ExamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamsService = TestBed.get(ExamsService);
    expect(service).toBeTruthy();
  });
});

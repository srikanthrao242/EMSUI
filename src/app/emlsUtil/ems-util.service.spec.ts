import { TestBed } from '@angular/core/testing';

import { EmsUtilService } from './ems-util.service';

describe('EmsUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmsUtilService = TestBed.get(EmsUtilService);
    expect(service).toBeTruthy();
  });
});

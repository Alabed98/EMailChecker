import { TestBed } from '@angular/core/testing';

import { CheckAdvanceService } from '../services/check-advance.service';

describe('CheckAdvanceService', () => {
  let service: CheckAdvanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAdvanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

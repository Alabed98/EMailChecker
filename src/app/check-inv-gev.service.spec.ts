import { TestBed } from '@angular/core/testing';

import { CheckInvGevService } from './check-inv-gev.service';

describe('CheckInvGevService', () => {
  let service: CheckInvGevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInvGevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

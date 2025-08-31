import { TestBed } from '@angular/core/testing';

import { CheckNotesService } from './check-notes.service';

describe('CheckNotesService', () => {
  let service: CheckNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

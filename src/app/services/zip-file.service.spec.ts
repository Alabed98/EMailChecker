import { TestBed } from '@angular/core/testing';

import { ZipFileService } from './zip-file.service';

describe('ZipFileService', () => {
  let service: ZipFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

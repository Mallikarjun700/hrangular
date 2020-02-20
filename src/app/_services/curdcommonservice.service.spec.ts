import { TestBed } from '@angular/core/testing';

import { CurdcommonserviceService } from './curdcommonservice.service';

describe('CurdcommonserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurdcommonserviceService = TestBed.get(CurdcommonserviceService);
    expect(service).toBeTruthy();
  });
});

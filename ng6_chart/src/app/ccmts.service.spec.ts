import { TestBed, inject } from '@angular/core/testing';

import { CcmtsService } from './ccmts.service';

describe('CcmtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcmtsService]
    });
  });

  it('should be created', inject([CcmtsService], (service: CcmtsService) => {
    expect(service).toBeTruthy();
  }));
});

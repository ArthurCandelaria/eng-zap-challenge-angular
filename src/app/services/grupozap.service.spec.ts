import { TestBed } from '@angular/core/testing';

import { GrupozapService } from './grupozap.service';

describe('GrupozapService', () => {
  let service: GrupozapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupozapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

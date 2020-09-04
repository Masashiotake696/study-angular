import { TestBed } from '@angular/core/testing';

import { HeroCacheService } from './hero-cache.service';

describe('HeroCacheService', () => {
  let service: HeroCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

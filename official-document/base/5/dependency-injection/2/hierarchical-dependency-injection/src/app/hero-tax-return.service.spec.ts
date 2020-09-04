import { TestBed } from '@angular/core/testing';

import { HeroTaxReturnService } from './hero-tax-return.service';

describe('HeroTaxReturnService', () => {
  let service: HeroTaxReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroTaxReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DateLoggerService } from './date-logger.service';

describe('DateLoggerService', () => {
  let service: DateLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

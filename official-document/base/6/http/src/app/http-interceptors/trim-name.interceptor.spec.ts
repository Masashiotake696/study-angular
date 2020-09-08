import { TestBed } from '@angular/core/testing';

import { TrimNameInterceptor } from './trim-name.interceptor';

describe('TrimNameInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TrimNameInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TrimNameInterceptor = TestBed.inject(TrimNameInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { QuetionProviderService } from './quetion-provider.service';

describe('QuetionProviderService', () => {
  let service: QuetionProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuetionProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChallengeTakersService } from './challenge-takers.service';

describe('ChallengeTakersService', () => {
  let service: ChallengeTakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeTakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

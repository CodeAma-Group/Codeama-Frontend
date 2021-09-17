import { TestBed } from '@angular/core/testing';

import { AddChallengeService } from './add-challenge.service';

describe('AddChallengeService', () => {
  let service: AddChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

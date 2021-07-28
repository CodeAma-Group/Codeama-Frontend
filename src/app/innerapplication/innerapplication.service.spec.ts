import { TestBed } from '@angular/core/testing';

import { InnerapplicationService } from './innerapplication.service';

describe('InnerapplicationService', () => {
  let service: InnerapplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerapplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

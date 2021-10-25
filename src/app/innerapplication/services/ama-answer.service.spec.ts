import { TestBed } from '@angular/core/testing';

import { AmaAnswerService } from './ama-answer.service';

describe('AmaAnswerService', () => {
  let service: AmaAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmaAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

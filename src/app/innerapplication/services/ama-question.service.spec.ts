import { TestBed } from '@angular/core/testing';

import { AmaQuestionService } from './ama-question.service';

describe('AmaQuestionService', () => {
  let service: AmaQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmaQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

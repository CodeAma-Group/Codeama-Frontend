import { TestBed } from '@angular/core/testing';

import { CodeamaService } from './codeama.service';

describe('CodeamaService', () => {
  let service: CodeamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

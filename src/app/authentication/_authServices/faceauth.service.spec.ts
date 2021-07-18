import { TestBed } from '@angular/core/testing';

import { FaceauthService } from './faceauth.service';

describe('FaceauthService', () => {
  let service: FaceauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

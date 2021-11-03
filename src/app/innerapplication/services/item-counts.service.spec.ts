import { TestBed } from '@angular/core/testing';

import { ItemCountsService } from './item-counts.service';

describe('ItemCountsService', () => {
  let service: ItemCountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

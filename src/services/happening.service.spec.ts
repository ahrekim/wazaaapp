import { TestBed } from '@angular/core/testing';

import { HappeningService } from './happening.service';

describe('HappeningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappeningService = TestBed.get(HappeningService);
    expect(service).toBeTruthy();
  });
});

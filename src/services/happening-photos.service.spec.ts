import { TestBed } from '@angular/core/testing';

import { HappeningPhotosService } from './happening-photos.service';

describe('HappeningPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappeningPhotosService = TestBed.get(HappeningPhotosService);
    expect(service).toBeTruthy();
  });
});

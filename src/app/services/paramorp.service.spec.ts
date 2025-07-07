import { TestBed } from '@angular/core/testing';

import { ParamorpService } from './paramorp.service';

describe('ParamorpService', () => {
  let service: ParamorpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamorpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

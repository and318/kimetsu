import { TestBed } from '@angular/core/testing';

import { DemonSlayerService } from './demon-slayer.service';

describe('DemonSlayerService', () => {
  let service: DemonSlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonSlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

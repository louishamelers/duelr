import { TestBed } from '@angular/core/testing';

import { PlaygroupService } from './playgroup.service';

describe('PlaygroupService', () => {
  let service: PlaygroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaygroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

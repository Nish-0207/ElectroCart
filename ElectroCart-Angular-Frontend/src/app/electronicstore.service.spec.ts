import { TestBed } from '@angular/core/testing';

import { ElectroCartService } from './electronicstore.service';

describe('ElectronicstoreService', () => {
  let service: ElectroCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectroCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

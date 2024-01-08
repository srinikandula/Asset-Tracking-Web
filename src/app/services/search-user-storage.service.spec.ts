import { TestBed } from '@angular/core/testing';

import { SearchUserStorageService } from './search-user-storage.service';

describe('SearchUserStorageService', () => {
  let service: SearchUserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

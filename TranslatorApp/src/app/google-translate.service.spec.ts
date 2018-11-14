import { TestBed } from '@angular/core/testing';

import { GoogleTranslateService } from './google-translate.service';

describe('GoogleTranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleTranslateService = TestBed.get(GoogleTranslateService);
    expect(service).toBeTruthy();
  });
});

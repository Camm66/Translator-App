import { TestBed } from '@angular/core/testing';

import { GoogleTranslateService } from './google-translate.service';

describe('GoogleTranslateService', () => {
  let googleServiceStub: Partial<GoogleTranslateService>;
      googleServiceStub = {
      };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: GoogleTranslateService, useValue: googleServiceStub}]
  }));

  it('should be created', () => {
    const service: GoogleTranslateService = TestBed.get(GoogleTranslateService);
    expect(service).toBeTruthy();
  });
});

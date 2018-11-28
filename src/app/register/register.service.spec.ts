import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let registerServiceStub: Partial<RegisterService>;
      registerServiceStub = {
      };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: RegisterService, useValue: registerServiceStub}]
  }));

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });
});

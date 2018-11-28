import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginServiceStub: Partial<LoginService>;
      loginServiceStub = {
      };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: LoginService, useValue: loginServiceStub}]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});

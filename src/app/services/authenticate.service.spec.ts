import { User } from './../models/user';
import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';
import { of } from 'rxjs';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  const user: User = {
    username: 'Vaishali',
    password: 'V@12345jain',
  };
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(AuthenticateService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    const authenticated = service.login(user);
    authenticated.subscribe((auth) => {
      expect(auth).toBeTruthy();
    });
  });

  it('should return false if user is not authenticated', () => {
    const authenticated = service.login({username: 'Vaishali' , password: 'V@66767987jai'});
    authenticated.subscribe((auth) => {
      expect(auth).toBeFalsy();
    });
  });
});

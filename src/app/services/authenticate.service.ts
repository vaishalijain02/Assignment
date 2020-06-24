import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  login(user: User): Observable<boolean> {
    if (user.password === 'V@12345jain') {
      return of(true);
    }
    return of(false);
  }
}

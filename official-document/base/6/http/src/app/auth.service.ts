import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  getAuthorizationToken(): string {
    return 'some-auth-token';
  }
}

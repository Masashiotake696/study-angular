import { Injectable } from '@angular/core';

export interface User {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserById(userId: number): User {
    return {
      name: 'Bombasto',
      role: 'Admin',
    };
  }
}

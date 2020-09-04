import { Injectable } from '@angular/core';

export class User {
  constructor(public name: string, public isAuthorized = false) {}
}

const alice = new User('Alice', true);
const bob = new User('Bob', false);

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = bob;

  getNewUser(): User {
    return this.user = this.user === bob ? alice : bob;
  }
}

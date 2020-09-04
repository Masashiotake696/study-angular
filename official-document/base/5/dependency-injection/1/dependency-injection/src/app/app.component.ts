import { Component, Inject } from '@angular/core';

import { APP_CONFIG } from './app.config';
import { AppConfig } from './app-config';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(
    @Inject(APP_CONFIG) config: AppConfig,
    private userService: UserService
  ) {
    this.title = config.title;
  }

  get user(): User {
    return this.userService.user;
  }

  get isAuthorized(): boolean {
    return this.user.isAuthorized;
  }

  get userInfo(): string {
    return `Current user, ${this.user.name}, is ${this.isAuthorized ? '' : 'not'} authorized.`;
  }

  nextUser(): void {
    this.userService.getNewUser();
  }
}

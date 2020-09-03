import { Component } from '@angular/core';
import { UserService } from 'src/app/greeting/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [
    UserService,
  ]
})
export class CustomersComponent {
  userName = '';

  constructor(userService: UserService) {
    this.userName = userService.userName;
  }
}

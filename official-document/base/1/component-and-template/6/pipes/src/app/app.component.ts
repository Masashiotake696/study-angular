import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  birthday = new Date();
  toggle = true;
  amount = 1000;
  text = '123456789';

  get format(): string {
    return this.toggle ? 'shortDate' : 'fullDate';
  }

  toggleFormat(): void {
    this.toggle = !this.toggle;
  }
}

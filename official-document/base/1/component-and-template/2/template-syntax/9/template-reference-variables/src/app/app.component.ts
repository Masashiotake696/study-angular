import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitMessage: string;

  callPhone(phoneNumber: string): void {
    console.log(`Phone number: ${phoneNumber}`);
  }

  onSubmit(form: NgForm): void {
    this.submitMessage = 'Submitted. Form value is ' + JSON.stringify(form.value);
  }
}

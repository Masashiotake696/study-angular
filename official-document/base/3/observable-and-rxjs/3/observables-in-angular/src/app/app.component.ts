import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onOpen(): void {
    console.log('open');
  }

  onClose(): void {
    console.log('close');
  }
}

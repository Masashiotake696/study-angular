import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentCustomer = 'Test Taro';
  title = 'interpolation';
  itemImageUrl = 'https://angular.jp/assets/images/logos/angular/logo-nav@2x.png';
  customers = [
    { name: 'Taro' },
    { name: 'Jiro' },
    { name: 'Saburo' },
  ];

  getVal(): number {
    return 1;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-template-favorite-color',
  templateUrl: './template-favorite-color.component.html',
  styleUrls: ['./template-favorite-color.component.css']
})
export class TemplateFavoriteColorComponent {
  favoriteColor = '';

  checkInput(): void {
    console.log(this.favoriteColor);
  }

  setValue(): void {
    this.favoriteColor = 'Blue';
  }
}

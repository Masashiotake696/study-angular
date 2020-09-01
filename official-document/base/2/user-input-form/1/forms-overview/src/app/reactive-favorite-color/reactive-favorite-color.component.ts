import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  templateUrl: './reactive-favorite-color.component.html',
  styleUrls: ['./reactive-favorite-color.component.css']
})
export class ReactiveFavoriteColorComponent {
  favoriteColorControl = new FormControl('');

  checkInput(): void {
    console.log(this.favoriteColorControl);
    console.log('Input value:', this.favoriteColorControl.value);
  }

  setValue(): void {
    this.favoriteColorControl.setValue('Blue');
  }
}

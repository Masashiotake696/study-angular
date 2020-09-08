import { Component } from '@angular/core';

import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
  providers: [
    UploaderService,
  ]
})
export class UploaderComponent {
  message: string;

  constructor(private uploaderService: UploaderService) { }

  onPicked(input: HTMLInputElement): void {
    const file = input.files[0];
    if (file) {
      this.uploaderService.upload(file)
        .subscribe(message => {
          input.value = null;
          this.message = message;
        });
    }
  }

}

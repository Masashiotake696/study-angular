import { Component } from '@angular/core';

import { DownloaderService } from './downloader.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.css'],
  providers: [
    DownloaderService,
  ]
})
export class DownloaderComponent {
  contents: string;

  constructor(private downloaderService: DownloaderService) { }

  download(): void {
    this.downloaderService.getTextFile('assets/textfile.txt').subscribe(result => this.contents = result);
  }

  clear(): void {
    this.contents = undefined;
  }
}

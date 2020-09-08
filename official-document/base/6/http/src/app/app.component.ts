import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showUploader = true;
  showSearch = true;

  toggleHeroes(): void {
    this.showHeroes = !this.showHeroes;
  }

  toggleConfig(): void {
    this.showConfig = !this.showConfig;
  }

  toggleDownloader(): void {
    this.showDownloader = !this.showDownloader;
  }

  toggleUploader(): void {
    this.showUploader = !this.showUploader;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}

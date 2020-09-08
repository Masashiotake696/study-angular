import { Component } from '@angular/core';
import { SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bypass-security',
  templateUrl: './bypass-security.component.html',
  styleUrls: ['./bypass-security.component.css']
})
export class BypassSecurityComponent {
  dangerousUrl: string;
  trustedUrl: SafeUrl;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer) {
    this.dangerousUrl = 'javascript:alert("Hi there")';
    this.trustedUrl = domSanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
    this.updateVideoUrl('PUBnlbjZFAI');
  }

  updateVideoUrl(id: string): void {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}

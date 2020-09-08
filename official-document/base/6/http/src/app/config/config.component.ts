import { Component } from '@angular/core';

import { ConfigService } from './config.service';
import { Config } from './config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [
    ConfigService,
  ]
})
export class ConfigComponent {
  error: any;
  headers: string[];
  config: Config;

  constructor(private configService: ConfigService) { }

  clear(): void {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig(): void {
    this.configService.getConfig().subscribe({
      next: (data: Config) => this.config = { ...data },
      error: (error: any) => this.error = error,
    });
  }

  showConfigResponse(): void {
    this.configService.getConfigResponse().subscribe(response => {
      const keys = response.headers.keys();
      this.headers = keys.map(key => `${key}: ${response.headers.get(key)}`);
      this.config = { ...response.body };
    });
  }

  makeError(): void {
    this.configService.makeIntentionalError().subscribe({
      next: () => null,
      error: error => this.error = error,
    });
  }
}

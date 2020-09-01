import { Component, Input } from '@angular/core';

import { AdComponent } from '../ad/ad.component';
import { HeroJobAd } from '../hero-job-ad';

@Component({
  selector: 'app-hero-job-ad',
  templateUrl: './hero-job-ad.component.html',
  styleUrls: ['./hero-job-ad.component.css']
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: HeroJobAd;
}

import { Component, Input } from '@angular/core';

import { AdComponent } from '../ad/ad.component';
import { HeroProfile } from '../hero-profile';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements AdComponent {
  @Input() data: HeroProfile;
}

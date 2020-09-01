import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { AdItem } from './ad-item';
import { HeroJobAd } from './hero-job-ad';
import { HeroProfile } from './hero-profile';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  getAds(): AdItem[] {
    const heroProfile1: HeroProfile = {
      name: 'Bombasto',
      bio: 'Brave as they come',
    };
    const heroProfile2: HeroProfile = {
      name: 'Dr IQ',
      bio: 'Smart as they come',
    };
    const heroJobAd1: HeroJobAd = {
      headline: 'Hiring for several positions',
      body: 'Submit your resume today!',
    };
    const heroJobAd2: HeroJobAd = {
      headline: 'Openings in all departments',
      body: 'Apply today',
    };

    return [
      new AdItem(HeroProfileComponent, heroProfile1),
      new AdItem(HeroProfileComponent, heroProfile2),
      new AdItem(HeroJobAdComponent, heroJobAd1),
      new AdItem(HeroJobAdComponent, heroJobAd2),
    ];
  }
}

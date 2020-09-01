import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { AdDirective } from '../ad.directive';
import { AdItem } from '../ad-item';
import { AdComponent } from '../ad/ad.component';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  @ViewChild(AdDirective, { static: true }) Ad: AdDirective;
  currentAdIndex = -1;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  loadComponent(): void {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.Ad.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  getAds(): void {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}

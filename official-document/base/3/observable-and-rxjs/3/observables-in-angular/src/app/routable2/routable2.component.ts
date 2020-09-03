import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-routable2',
  templateUrl: './routable2.component.html',
  styleUrls: ['./routable2.component.css']
})
export class Routable2Component implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // ActivatedRouteのurlを購読して、URLの変更を追跡
    this.activatedRoute.url.subscribe((url: UrlSegment[]) => console.log(`The URL changed to: ${url}`));
  }

}

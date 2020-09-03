import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-routable1',
  templateUrl: './routable1.component.html',
  styleUrls: ['./routable1.component.css']
})
export class Routable1Component implements OnInit {
  navigationStart: Observable<NavigationStart>;

  constructor(private router: Router) {
    // RouterイベントからNavigationStartイベントのみを抽出
    this.navigationStart = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    // Routerイベント（NavigationStart）を購読
    this.navigationStart.subscribe((event: NavigationStart) => console.log('Navigation Started!'));
  }

}

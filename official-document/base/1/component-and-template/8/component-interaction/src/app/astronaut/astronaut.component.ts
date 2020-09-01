import { Component, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-astronaut',
  template: `
    <p>
      {{ astronaut }}: <strong>{{ mission }}</strong>
      <button (click)="confirm()" [disabled]="!announced || confirmed">Confirm</button>
    </p>
  `
})
export class AstronautComponent implements OnDestroy {
  @Input() astronaut: string;
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  constructor(private missionService: MissionService) {
    // subscriptionを補足
    this.subscription = this.missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
      }
    );
  }

  ngOnDestroy(): void {
    // 補足したsubscriptionをAstronautComponentが破棄されたときにunsubscribeする（メモリリークガード）
    this.subscription.unsubscribe();
  }

  confirm(): void {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }
}

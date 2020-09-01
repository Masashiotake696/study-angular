import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloChildComponent } from './hello-child/hello-child.component';
import { HelloParentComponent } from './hello-parent/hello-parent.component';
import { NameChildComponent } from './name-child/name-child.component';
import { NameParentComponent } from './name-parent/name-parent.component';
import { VersionParentComponent } from './version-parent/version-parent.component';
import { VersionChildComponent } from './version-child/version-child.component';
import { VoterComponent } from './voter/voter.component';
import { VotetakerComponent } from './votetaker/votetaker.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CountdownLocalVariableParentComponent } from './countdown-local-variable-parent/countdown-local-variable-parent.component';
import { CountdownViewChildParentComponent } from './countdown-view-child-parent/countdown-view-child-parent.component';
import { MissioncontrolComponent } from './missioncontrol/missioncontrol.component';
import { AstronautComponent } from './astronaut/astronaut.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloChildComponent,
    HelloParentComponent,
    NameChildComponent,
    NameParentComponent,
    VersionParentComponent,
    VersionChildComponent,
    VoterComponent,
    VotetakerComponent,
    CountdownTimerComponent,
    CountdownLocalVariableParentComponent,
    CountdownViewChildParentComponent,
    MissioncontrolComponent,
    AstronautComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

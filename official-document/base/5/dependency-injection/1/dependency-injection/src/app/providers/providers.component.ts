import { Component, Injectable, Inject, OnInit, Optional } from '@angular/core';

import { Logger } from '../logger.service';
import { UserService } from '../user.service';
import { APP_CONFIG, AppConfig, HERO_DI_CONFIG } from '../app.config';
import { heroServiceProvider } from '../heroes/hero.service.provider';
import { HeroService } from '../heroes/hero.service';

const template = '{{ log }}';

@Component({
  selector: 'app-provider-1',
  template,
  providers: [
    Logger
  ]
})
export class Provider1Component {
  log: string;

  constructor(logger: Logger) {
    logger.log('Hello from logger provided with Logger class');
    this.log = logger.logs[0];
  }
}

////////////////////////////////////

@Component({
  selector: 'app-provider-3',
  template,
  providers: [
    { provide: Logger, useClass: Logger }
  ]
})
export class Provider3Component {
  log: string;

  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:Logger');
    this.log = logger.logs[0];
  }
}

////////////////////////////////////
@Injectable()
export class BetterLogger extends Logger {}

@Component({
  selector: 'app-provider-4',
  template,
  providers: [
    { provide: Logger, useClass: BetterLogger }
  ]
})
export class Provider4Component {
  log: string;

  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:BetterLogger');
    this.log = logger.logs[0];
  }
}

////////////////////////////////////
@Injectable()
export class EvenBetterLogger extends Logger {
  constructor(private userService: UserService) {
    super();
  }

  log(message: string): void {
    const name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}

@Component({
  selector: 'app-provider-5',
  template,
  providers: [
    UserService,
    { provide: Logger, useClass: EvenBetterLogger },
  ]
})
export class Provider5Component {
  log: string;

  constructor(logger: Logger) {
    logger.log('Hello from EvenBetterLogger');
    this.log = logger.logs[0];
  }
}

////////////////////////////////////
@Injectable()
export class NewLogger extends Logger {}

export class OldLogger {
  logs: string[] = [];

  log(message: string): void {
    throw new Error('Shoud not call the old logger!');
  }
}

@Component({
  selector: 'app-provider-6a',
  template,
  providers: [
    NewLogger,
    // Not aliased! Creates two instance of 'NewLogger'
    { provide: OldLogger, useClass: NewLogger }
  ]
})
export class Provider6aComponent {
  log: string;

  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger === oldLogger) {
      throw new Error('expected the two loggers to be different instance');
    }
    // ここまで処理が通ったらOldLoggerとNewLoggerは別のインスタンスである（実態はNewLoggerインスタンス）
    oldLogger.log('Hello OldLogger (but we want NewLogger)');
    this.log = newLogger.logs[0] || oldLogger.logs[0];
  }
}

@Component({
  selector: 'app-provider-6b',
  template,
  providers: [
    NewLogger,
    // Alias OldLogger w/ reference to NewLogger
    { provide: OldLogger, useExisting: NewLogger }
  ]
})
export class Provider6bComponent {
  log: string;

  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger !== oldLogger) {
      throw new Error('expected the two loggers to be the same instance');
    }
    // ここまで処理が通ったらOldLoggerとNewLoggerは同じインスタンスである（実態はNewLoggerインスタンス）
    oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
    this.log = newLogger.logs[0];
  }
}

////////////////////////////////////
function silentLoggerFn(): void {}

export const SilentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: silentLoggerFn,
};

@Component({
  selector: 'app-provider-7',
  template,
  providers: [
    { provide: Logger, useValue: SilentLogger }
  ]
})
export class Provider7Component {
  log: string;

  constructor(logger: Logger) {
    // この処理は何も実行されない
    logger.log('Hello from logger provided with useValue');
    this.log = logger.logs[0];
  }
}

////////////////////////////////////

@Component({
  selector: 'app-provider-8',
  template,
  providers: [
    heroServiceProvider,
    Logger,
    UserService,
  ]
})
export class Provider8Component {
  log = 'Hero service injected successfully via heroServiceProvider';

  constructor(heroService: HeroService) {}
}

////////////////////////////////////

@Component({
  selector: 'app-provider-9',
  template,
  providers: [
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
  ]
})
export class Provider9Component implements OnInit {
  log: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit(): void {
    this.log = `APP_CONFIG Application title is ${this.config.title}`;
  }
}

////////////////////////////////////
const someMessage = 'Hello from the injected logger';

@Component({
  selector: 'app-provider-10',
  template,
  providers: [
    { provide: Logger, useValue: null }
  ]
})
export class Provider10Component implements OnInit {
  log: string;

  constructor(@Optional() private logger?: Logger) {
    if (this.logger) {
      this.logger.log(someMessage);
    }
  }

  ngOnInit(): void {
    this.log = this.logger ? this.logger.logs[0] : 'Optional logger was not available';
  }
}

////////////////////////////////////

@Component({
  selector: 'app-providers',
  template: `
    <h2>Provider variations</h2>
    <div id="p1">
      <app-provider-1></app-provider-1>
    </div>
    <div id="p3">
      <app-provider-3></app-provider-3>
    </div>
    <div id="p4">
      <app-provider-4></app-provider-4>
    </div>
    <div id="p5">
      <app-provider-5></app-provider-5>
    </div>
    <div id="p6a">
      <app-provider-6a></app-provider-6a>
    </div>
    <div id="p6b">
      <app-provider-6b></app-provider-6b>
    </div>
    <div id="p7">
      <app-provider-7></app-provider-7>
    </div>
    <div id="p8">
      <app-provider-8></app-provider-8>
    </div>
    <div id="p9">
      <app-provider-9></app-provider-9>
    </div>
    <div id="p10">
      <app-provider-10></app-provider-10>
    </div>
  `,
})
export class ProvidersComponent { }

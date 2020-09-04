import { Component, InjectionToken, Inject } from '@angular/core';

import { MinimalLogger } from '../minimal-logger.service';
import { Hero } from '../hero';
import { RUNNERS_UP, runnersUpFactory } from '../runners-up';
import { LoggerService } from '../logger.service';
import { HeroService } from '../hero.service';
import { DateLoggerService } from '../date-logger.service';

export const TITLE = new InjectionToken<string>('title');

export const someHero = new Hero(42, 'Magma', 'Had a great month!', '555-555-5555');

@Component({
  selector: 'app-hero-of-the-month',
  templateUrl: './hero-of-the-month.component.html',
  styleUrls: ['./hero-of-the-month.component.css'],
  providers: [
    // useValueプロバイダーキーを使用して、固定値をDIトークンに関連付ける
    { provide: Hero, useValue: someHero },
    { provide: TITLE, useValue: 'Hero of the Month' },
    // useClassプロバイダーキーを使用して、指定したクラスの新しいインスタンスを作成して返す
    { provide: HeroService, useClass: HeroService },
    { provide: LoggerService, useClass: DateLoggerService },
    // useExistingプロバイダーキーを使用して、あるトークンを別のトークンにマッピングする
    { provide: MinimalLogger, useExisting: LoggerService },
    // useFactoryプロバイダーキーを使用して、ファクトリー関数を呼び出して依存オブジェクトを作成する
    { provide: RUNNERS_UP, useFactory: runnersUpFactory(2), deps: [Hero, HeroService] },
  ]
})
export class HeroOfTheMonthComponent {
  logs: string[] = [];

  constructor(
    logger: MinimalLogger,
    public heroOfTheMonth: Hero,
    @Inject(RUNNERS_UP) public runnersUp: string,
    @Inject(TITLE) public title: string,
  ) {
    // loggerはMinimalLoggerクラスインターフェースを使用しているため、logsとlogInfoの二つのメンバーのみにアクセス可能（LoggerServiceへのアクセスを絞れる）
    this.logs = logger.logs;
    logger.logInfo('starting up');
  }

}

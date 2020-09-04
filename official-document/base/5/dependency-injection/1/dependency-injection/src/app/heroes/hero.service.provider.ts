import { Logger } from '../logger.service';
import { UserService } from '../user.service';
import { HeroService } from './hero.service';

// LoggerとUserServiceにアクセスできるファクトリー関数
const heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};

// ファクトリープロバイダーを使用してHeroServiceの新しいロガーインスタンスを作成
export let heroServiceProvider = {
  provide: HeroService,
  useFactory: heroServiceFactory, // ファクトリー関数を指定
  deps: [Logger, UserService] // ファクトリー関数パラメータに注入
};

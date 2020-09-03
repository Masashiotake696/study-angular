import { Injectable } from '@angular/core';

import { UserModule } from './user.module';

export class User {
  constructor(public id: number, public name: string) {}
}

@Injectable({
  // ルートアプリケーションインジェクターにサービスプロバイダーを追加すると、アプリケーション全体で使用することができる
  providedIn: 'root'

  // UserModuleをインポートしない限りUserServiceをアプリケーションで利用できないように、モジュール内でサービスを提供するように指定
  // ※ この方法がサービスのどこからも注入されない時にツリーシェイキングの対象にできるので推奨
  // providedIn: UserModule,

  // 遅延ロードされたモジュールは自身のユニークなインスタンスをそれぞれ取得し、全ての即時ロードされたモジュールはシングルトンインスタンスを共有する
  // providedIn: 'any'
})
export class UserService {
  getUsers(): Promise<User[]> {
    return Promise.resolve([
      new User(1, 'Maria'),
      new User(2, 'Alex'),
      new User(3, 'Chuntao'),
      new User(4, 'Beatrice'),
      new User(5, 'Sarah'),
      new User(6, 'Andres'),
      new User(7, 'Abdul'),
      new User(8, 'Pierre'),
      new User(9, 'Jiao'),
      new User(10, 'Seth'),
    ]);
  }
}

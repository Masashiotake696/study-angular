import { Injectable, NgModule } from '@angular/core';

@Injectable()
export class Service {
  doSomething(): void {}
}

@NgModule({
  providers: [Service] // インジェクターのサービスプロバイダーを指定しているためツリーシェイキング不可能
})
export class ServiceModule {}

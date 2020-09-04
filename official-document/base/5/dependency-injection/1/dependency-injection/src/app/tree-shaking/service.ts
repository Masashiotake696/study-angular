import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // サービス自体の@Injectableデコレーターで指定することでツリーシェイキングが可能になる
  useFactory: () => new Service('dependency'), // ファクトリー関数を構成することでサービスをインスタンス化できる
})
export class Service {
  constructor(dep: string) {
    console.log(dep);
  }
}

import { Component } from '@angular/core'
import { UseService } from './use.service'
import { AliasService } from './alias.service'

@Component({
  selector: 'my-use',
  // サービスインスタンスの生成方法を宣言
  providers: [
    // サービスを呼び出される度に毎回インスタンス化
    // {
    //   provide: UseService, useClass: UseService
    // },
    // 常に同じオブジェクトを注入する
    // {
    //   provide: UseService, useValue: new UseService()
    // },
    // トークンのエイリアスを生成する
    // {
    //   provide: AliasService, useExisting: UseService
    // },
    // ファクトリー関数を使ってサービスを生成する
    {
      provide: UseService, useFactory: () => {
        let service = new UseService()
        // 秒とミリ秒を切り捨て
        service.created.setSeconds(0)
        service.created.setMilliseconds(0)
        return service
      }
    },
  ],
  template: `
    <li>UseService：{{ current }}</li>
  `
})
export class UseComponent {
  current: string

  // UseService#showメソッドで、サービスの生成時刻を表示
  constructor(
    private useService: UseService,
    // private aliasService: AliasService,
  ) {
    this.current = useService.show()
    // console.log(aliasService.show())
  }
}

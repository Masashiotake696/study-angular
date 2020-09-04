import { Component, Optional } from '@angular/core';

import { OptionalService } from '../optional.service';

@Component({
  selector: 'app-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.css']
})
export class OptionalComponent {

  // @Optional()を使用すると、Angularは注入するサービスをオプショナルと見なす
  // OptionalServiceは、@NgModule()とコンポーネントクラスで提供されていないが、@Optional()によりエラーはスローされない
  constructor(@Optional() public optional?: OptionalService) { }

}

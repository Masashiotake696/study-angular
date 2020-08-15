import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'grep',
  pure: false, // impureなパイプを宣言（配列/オブジェクトの参照が変更された時だけでなく、要素/メンバーが変更、追加、削除された時も再評価されるパイプ）
})
export class GrepPipe implements PipeTransform {
  transform(values: any[], callback: (item: any) => boolean) {
    if (!Array.isArray(values)) {
      return values
    }

    return values.filter(callback)
  }
}

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 50, omission: string = '...') {
    if (typeof value !== 'string' || value.length <= length) {
      return value
    }

    return value.substring(0, length) + omission
  }
}

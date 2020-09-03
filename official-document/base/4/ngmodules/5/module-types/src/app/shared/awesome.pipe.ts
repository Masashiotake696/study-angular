import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'awesome'
})
export class AwesomePipe implements PipeTransform {

  transform(phrase: string): string {
    return phrase ? `Awesome ${phrase}` : '';
  }

}

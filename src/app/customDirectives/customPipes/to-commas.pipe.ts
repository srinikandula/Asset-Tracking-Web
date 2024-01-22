import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCommas'
})
export class ToCommasPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
    });
    const result = formatter.format(value).split('.').join('');
    return  result.substring(0, result.length - 2);
  }

}

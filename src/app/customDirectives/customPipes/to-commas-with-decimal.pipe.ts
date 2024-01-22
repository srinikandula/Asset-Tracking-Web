import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toCommasWithDecimal'
})
export class ToCommasWithDecimalPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
    });
    return  formatter.format(value);
  }

}

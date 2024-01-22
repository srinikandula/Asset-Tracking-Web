import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: any, args?: any): string{
    if (value < 999999){
      const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
      });
      return  formatter.format(value);
    }else if (value > 1000000){
      return (value / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: any, args?: any): unknown {
    let i;
    const frags = value ? value.split('_') : '';
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags ? frags.join(' ') : '';
  }
}

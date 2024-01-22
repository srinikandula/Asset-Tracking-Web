import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {cusSort} from './cus-sort';

@Directive({
  selector: '[appFrentendSort]'
})
export class FrentendSortDirective {
  @Input() appFrentendSort: Array<any>;
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener('click')
  sortData(): void {
    const sort = new cusSort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute('data-order');
    const type = elem.getAttribute('data-type');
    const property = elem.getAttribute('data-name');
    if (order === 'desc') {
      this.appFrentendSort.sort(sort.startSort(property, order, type));
      elem.removeAttribute('data-order');
      elem.setAttribute('data-order', 'asc');
    } else {
      this.appFrentendSort.sort(sort.startSort(property, order, type));
      elem.removeAttribute('data-order');
      elem.setAttribute('data-order', 'desc');
    }
  }
}

import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Pipe, PipeTransform} from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class OnlynumberDirective {

    constructor(private eRef: ElementRef) {
    }

    private static sortOrder: '';
    private static orderBy = 'asc';

    // @ts-ignore
    @Input() numbersOnly: boolean;

    static pagination(res: any, data: any): void {
        let count, add, total = 0, size = 0;
        count = res;
        if (data.pageSizes.length === 0) {
            if (count >= 10) {
                data.pageSizes.push(10);
                if (data.size !== 10) {
                    data.pageSizes.push(data.size);
                }
            }
            for (let i = 0; i < 4; i++) {
                add = Math.ceil((10 + count) / 10);
                add = Math.ceil((add / 10)) * 20;
                total = total + add;
                if (total >= count) {
                    break;
                } else {
                    data.pageSizes.push(total);
                }
            }
            data.pageSizes.push(count);
        } else {
            data.pageSizes = [];
            if (count >= 10) {
                data.pageSizes.push(10);
                if (data.size !== 10) {
                    data.pageSizes.push(data.size);
                }
            }
            for (let i = 0; i < 4; i++) {
                add = Math.ceil((10 + count) / 10);
                add = Math.ceil((add / 10)) * 20;
                total = total + add;
                if (total >= count) {
                    break;
                } else {
                    data.pageSizes.push(total);
                }
            }
            data.pageSizes.push(count);
        }
        data.pageSizes = [...new Set(data.pageSizes)];
        data.pageSizes.sort((a: any, b: any) => a - b);
        size = data.pageSizes.length;
    }

    static clickSorting(event: any, data: any): void {
        if (event.target.accessKey) {
            this.sortOrder = event.target.accessKey;
            if (this.orderBy === 'desc') {
                this.orderBy = 'asc';
                data.sortOrder = this.sortOrder;
                data.sort = this.sortOrder + ',asc';
                data.orderBy = 'asc';
            } else {
                this.orderBy = 'desc';
                data.sortOrder = this.sortOrder;
                data.sort = this.sortOrder + ',desc';
                data.orderBy = 'desc';
            }
        }
    }
    

    @HostListener('keydown', ['$event']) onKeyDown(event: any) {
        let e = <KeyboardEvent> event;
        if (this.numbersOnly) {
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }
    }

}

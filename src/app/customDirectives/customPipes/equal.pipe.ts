import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from '../multiSelect/multiselect.model';

@Pipe({
    name: 'equal'
})
export class EqualPipe implements PipeTransform {

    transform(items: ListItem[], filter: any, optionValue: any): ListItem[] {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            return items.filter((item: ListItem) => filterKeys.reduce((memo, keyName) => {
                return item[keyName] === filter[keyName];
                }, true)
            );
        } else {
            return items;
        }
    }

    editTransform(items: ListItem[], filter: any, optionValue: any, value: any): ListItem[] {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            return items.filter((item: ListItem) => filterKeys.reduce((memo, keyName) => {
                let i;
                for (i of value) {
                    if (i === item[optionValue]) {
                        item.checked = true;
                    }
                }
                return item[keyName] === filter[keyName];
            }, true));
        }
    }

    checkTransform(items: ListItem[], filter: any, checkData: boolean): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            if (checkData) {
                let ch;
                for (ch of items) {
                    ch.checked = true;
                }
            } else {
                let ch;
                for (ch of items) {
                    ch.checked = false;
                }
            }
            return items.filter((item: ListItem) =>
                filterKeys.reduce((memo, keyName) => {
                    return item[keyName] === filter[keyName];
                }, true)
            );
        }
    }

}

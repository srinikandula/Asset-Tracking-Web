import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from '../multiSelect/multiselect.model';

@Pipe({
    name: 'multiFilter'
})
export class FilterPipe implements PipeTransform {

    // transform(items: ListItem[], filter: any): any {
    //     console.log('items: ListItem[], filter: any', items, filter);
    //     let objName = Object.keys(filter);
    //     let nameLabel = objName[0];
    //     if (filter[nameLabel] && Array.isArray(items)) {
    //         let filterKeys = Object.keys(filter);
    //         return items.filter((item: ListItem) =>
    //             filterKeys.reduce((memo, keyName) =>
    //                 (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true
    //             )
    //         );
    //     } else {
    //         return items;
    //     }
    // }

    transform(items: ListItem[], filter: any): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            return items.filter(item =>
                filterKeys.reduce((memo, keyName) =>
                    (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
        } else {
            return items;
        }
    }

}

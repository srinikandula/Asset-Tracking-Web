import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'checkboxFilter'
})
export class CheckboxFilterPipe implements PipeTransform {

    transform(items: any, userVehicleType: any, fullName: any, userName: any): any {
        if (items && items.length){
            return items.filter(item => {
                if (fullName && item.fullName.toLowerCase().indexOf(fullName.toLowerCase()) === -1) {
                    return false;
                }
                if (userName && item.phoneNumber.toLowerCase().indexOf(userName.toLowerCase()) === -1) {
                    return false;
                }
                if (userVehicleType && String(item.userVehicleType).toLowerCase().indexOf(userVehicleType.toLowerCase()) === -1) {
                    return false;
                }
                return true;
            });
        }
        else{
            return items;
        }
    }

}

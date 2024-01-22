import {Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Pipe({
    name: 'lastLoginStatusFilter'
})
export class LastLoginStatusFilterPipe implements PipeTransform {
    public currentUser: any;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
        });
    }

    transform(value: unknown, ...args: unknown[]): unknown {
        if (value) {
            const currentDate = new Date(this.currentUser.serverDate);
            // @ts-ignore
            const userlastLogin = new Date(value);
            if (new Date(currentDate).getFullYear() === new Date(userlastLogin).getFullYear()) {
                if (new Date(currentDate).getMonth() === new Date(userlastLogin).getMonth()) {
                    if (new Date(currentDate).getDate() === new Date(userlastLogin).getDate()) {
                        return 'table-user-success-icon-dot';
                    } else if ((new Date(currentDate).getDate() - 1) === new Date(userlastLogin).getDate()) {
                        return 'table-user-warning-icon-dot';
                    } else {
                        return 'table-user-danger-icon-dot';
                    }
                } else {
                    return 'table-user-danger-icon-dot';
                }
            } else {
                return 'table-user-secondary-icon-dot';
            }
        } else {
            return 'table-user-secondary-icon-dot';
        }
    }

}

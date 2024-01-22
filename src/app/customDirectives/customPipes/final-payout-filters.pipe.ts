import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'finalPayoutFilters'
})
export class FinalPayoutFiltersPipe implements PipeTransform {

    transform(items: Array<any>, typeOfShiftsStates: any, typeOfShifts: any, verifiedDayWiseShift: any, rejectedDayWiseShift: any, unverifiedDayWiseShift: any, liteUserDayWiseShift: any, regularDayWiseShift: any): any {
        if (typeOfShiftsStates === '' && typeOfShifts === '') {
            return items;
        } else if (typeOfShiftsStates === 'All' && typeOfShifts === '') {
            return items;
        } else {
            return items.filter((shiftItems, k) => {
                // console.log(shiftItems);
                return shiftItems.shifts.filter((item, i) => {
                    // console.log(item);
                    if ((typeOfShiftsStates === 'All') && ((typeOfShifts === 'Lite User') || (typeOfShifts === 'Regular'))) {
                        if (item.shiftType === typeOfShifts) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'Verified') && ((typeOfShifts === 'Lite User') || (typeOfShifts === 'Regular'))) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates) && (item.shiftType === typeOfShifts)) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'Rejected') && ((typeOfShifts === 'Lite User') || (typeOfShifts === 'Regular'))) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates) && (item.shiftType === typeOfShifts)) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'UnVerified') && ((typeOfShifts === 'Lite User') || (typeOfShifts === 'Regular'))) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates) && (item.shiftType === typeOfShifts)) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'Verified')) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates)) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'Rejected')) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates)) {
                            return item;
                        }
                    } else if ((typeOfShiftsStates === 'UnVerified')) {
                        if ((item.tripVerificationStatus === typeOfShiftsStates)) {
                            return item;
                        }
                    } else if ((typeOfShifts === 'Lite User')) {
                        if ((item.shiftType === typeOfShifts)) {
                            return item;
                        }
                    } else if ((typeOfShifts === 'Regular')) {
                        if ((item.shiftType === typeOfShifts)) {
                            return item;
                        }
                    }
                });
                // if ((item.tripVerificationStatus === typeOfShiftsStates) && (item.shiftType === typeOfShifts)) {
                //     return item;
                // } else if ((item.tripVerificationStatus === typeOfShiftsStates) || (item.shiftType === typeOfShifts)) {
                //     return item;
                // } else {
                //     return item;
                // }
            });
        }
        // if (verifiedDayWiseShift || rejectedDayWiseShift || unverifiedDayWiseShift || liteUserDayWiseShift || regularDayWiseShift) {
        //     if ((verifiedDayWiseShift || rejectedDayWiseShift || unverifiedDayWiseShift) && (liteUserDayWiseShift || regularDayWiseShift)) {
        //         if (verifiedDayWiseShift && liteUserDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === verifiedDayWiseShift) && ((item.shiftType === liteUserDayWiseShift) || (item.shiftType === regularDayWiseShift))) {
        //                     return item;
        //                 }
        //             });
        //         } else if (verifiedDayWiseShift && liteUserDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === verifiedDayWiseShift) && (item.shiftType === liteUserDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         } else if (verifiedDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === verifiedDayWiseShift) && (item.shiftType === regularDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         } else if (rejectedDayWiseShift && liteUserDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === rejectedDayWiseShift) && ((item.shiftType === liteUserDayWiseShift) || (item.shiftType === regularDayWiseShift))) {
        //                     return item;
        //                 }
        //             });
        //         } else if (rejectedDayWiseShift && liteUserDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === rejectedDayWiseShift) && (item.shiftType === liteUserDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         } else if (rejectedDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === rejectedDayWiseShift) && (item.shiftType === regularDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         } else if (unverifiedDayWiseShift && liteUserDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === unverifiedDayWiseShift) && ((item.shiftType === liteUserDayWiseShift) || (item.shiftType === regularDayWiseShift))) {
        //                     return item;
        //                 }
        //             });
        //         } else if (unverifiedDayWiseShift && liteUserDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === unverifiedDayWiseShift) && (item.shiftType === liteUserDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         } else if (unverifiedDayWiseShift && regularDayWiseShift) {
        //             return items.filter((item, i) => {
        //                 if ((item.tripVerificationStatus === unverifiedDayWiseShift) && (item.shiftType === regularDayWiseShift)) {
        //                     return item;
        //                 }
        //             });
        //         }
        //     } else if (verifiedDayWiseShift || rejectedDayWiseShift || unverifiedDayWiseShift) {
        //         return items.filter((item, i) => {
        //             if ((item.tripVerificationStatus === verifiedDayWiseShift) || (item.tripVerificationStatus === rejectedDayWiseShift) || (item.tripVerificationStatus === unverifiedDayWiseShift)) {
        //                 return item;
        //             }
        //         });
        //     } else if (liteUserDayWiseShift || regularDayWiseShift) {
        //         return items.filter((item, i) => {
        //             if ((item.shiftType === liteUserDayWiseShift) || (item.shiftType === regularDayWiseShift)) {
        //                 return item;
        //             }
        //         });
        //     } else {
        //         return items;
        //     }
        // } else {
        //     return items;
        // }
    }
}

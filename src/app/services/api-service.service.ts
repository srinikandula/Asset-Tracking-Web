import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiUrls} from '../schemas/apiUrls';
import {map} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
// import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    public currentUser: any;
    public fileName: any;
    // public months: ['January', 'February', 'March', 'April', 'May', 'June',
    //     'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(private http: HttpClient, public Apiurls: ApiUrls, public authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe((userDetails: any) => {
            if (userDetails) {
                this.currentUser = userDetails;
                const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                this.fileName = this.currentUser.fullName + '_' + months[new Date(this.currentUser.serverDate).getMonth()] + ','
                    + new Date(this.currentUser.serverDate).getFullYear() + '_';
            }
        });
    }

    getUserRoleValue(key: any): string {
        if (key === 1) {
            return 'Associate';
        } else if (key === 5) {
            return 'Driver';
        } else if (key === 10) {
            return 'Driver And Associate';
        } else if (key === 15) {
            return 'Loader';
        } else if (key === 19) {
            return 'Process Associate';
        } else if (key === 20) {
            return 'Site Supervisor';
        } else if (key === 26) {
            return 'Hub Manager';
        } else if (key === 25) {
            return 'Shift Lead';
        } else if (key === 28) {
            return 'Technology';
        } else if (key === 27) {
            return 'Finance';
        } else if (key === 28) {
            return 'Technology';
        } else if (key === 29) {
            return 'Central';
        } else if (key === 30) {
            return 'Cluster Manager';
        } else if (key === 31) {
            return 'Ops Manager';
        } else if (key === 35) {
            return 'City Manager';
        } else if (key === 40) {
            return 'Regional Manager';
        } else if (key === 41) {
          return 'Vigilance';
        }else if (key === 45) {
            return 'Super User';
        } else if (key === 65) {
            return 'Employee';
        }else if (key === 43) {
            return 'Analytics';
        }else if (key === 47) {
            return 'People Ops';
        }else if (key === 70) {
            return 'Finance Lead';
        }else if (key === 72) {
            return 'Tech Lead';
        }else if (key === 74) {
            return 'Central Lead';
        }else if (key === 76) {
            return 'Vigilance Lead';
        }else if (key === 78) {
            return 'Analytics Lead';
        }else if (key === 80) {
            return 'People Op Lead';
        } else if (key === 500) {
            return 'House Keeper';
        } else {
            return key;
        }
    }

    getUserShortRoleValue(key: any): string {
        if (key === 1) {
            return 'A';
        } else if (key === 5) {
            return 'D';
        } else if (key === 10) {
            return 'DDA';
        } else if (key === 15) {
            return 'L';
        } else if (key === 19) {
            return 'PA';
        } else if (key === 20) {
            return 'SS';
        }
            // else if(key ==21) {
            //     return "Process Associate";
        // }
        else if (key === 25) {
            return 'SL';
        } else if (key === 26) {
            return 'HM';
        } else if (key === 27) {
            return 'F';
        } else if (key === 28) {
            return 'T';
        } else if (key === 29) {
            return 'C';
        } else if (key === 30) {
            return 'CLM';
        } else if (key === 31) {
            return 'OM';
        } else if (key === 35) {
            return 'CM';
        } else if (key === 45) {
            return 'SU';
        } else if (key === 65) {
            return 'E';
        } else if (key === 40) {
            return 'RM';
        } else if (key === 41) {
          return 'Vig';
        }else if (key === 43) {
            return 'Ana';
        }else if (key === 47) {
            return 'PO';
        }else if (key === 70) {
            return 'FL';
        }else if (key === 72) {
            return 'TL';
        }else if (key === 74) {
            return 'CL';
        }else if (key === 76) {
            return 'VL';
        }else if (key === 78) {
            return 'AL';
        }else if (key === 80) {
            return 'PL';
        }else if (key === 500) {
            return 'HK';
        } else {
            return key;
        }
    }
    getAll(subUrl: any, data: any) {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data);
    }

    getCount(subUrl: any, data: any) {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data);
    }

    create(subUrl: any, data: any) {
        return this.http.post(this.Apiurls.mainUrl + subUrl, data).pipe(map((res: any) => {
            return res;
        }));
    }

    get(subUrl: any) {
        return this.http.get(this.Apiurls.mainUrl + subUrl);
    }
    getSites(subUrl: any) {
        subUrl = 'https://sapi.whizzard.in/api/v1/expense/getSitesDropDownForExpense'
        return this.http.get( subUrl);
    }

    update(subUrl: any, data: any) {
        return this.http.put(this.Apiurls.mainUrl + subUrl, data);
    }

    delete(subUrl: any) {
        return this.http.delete(this.Apiurls.mainUrl + subUrl);
    }

    unDelete(subUrl: any, data: any) {
        return this.http.put(this.Apiurls.mainUrl + subUrl, data);
    }

    allData(subUrl: any, data: any) {
        return this.http.get(this.Apiurls.mainUrl + subUrl, data);
    }
}


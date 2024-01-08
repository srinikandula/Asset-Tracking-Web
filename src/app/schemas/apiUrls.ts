import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiUrls {

    // mainUrl = 'http://localhost:8090/';
    //  mainUrl = 'http://192.168.0.105:8090/';
    // mainUrl = 'http://10.72.25.219:8090/';
    mainUrl = environment.testPath;
    // mainUrl = 'https://sapi.whizzard.in/';

}

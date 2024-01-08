import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../../../services/api-service.service';
import {ApiUrls} from '../../../schemas/apiUrls';
import {AuthenticationService} from '../../../services/authentication.service';
// import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {SearchUserStorageService} from '../../../services/search-user-storage.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    currentUser: any = {
        serverDate: new Date()
    };

    constructor(
        private apiService: ApiServiceService,
        private authenticationService: AuthenticationService,
        private apiUrls: ApiUrls,
        // private datePipe: DatePipe,
        private router: Router,
        // private sanitizer: DomSanitizer,
        // private safePipe: SafePipe,
    ) {}

    ngOnInit(): void {

    }



}

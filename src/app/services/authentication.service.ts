import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../schemas/apiUrls';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private apiUrls: ApiUrls) {
        // @ts-ignore
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public isAuthenticated(): string {
        // @ts-ignore
      return localStorage.getItem('currentUser');
    }


    logIn(phoneNumber: string, password: string): any {
        return this.http.post<any>(this.apiUrls.mainUrl + 'api/auth/signin', {phoneNumber, password})
            .pipe(map(response => {
                if (response) {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                }
                return response;
            }));
    }

    logOut(): any {
        // @ts-ignore
        localStorage.clear('currentUser');
        this.currentUserSubject.next(null);
    }
}


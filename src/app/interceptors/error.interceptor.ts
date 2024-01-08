import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, public router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.clear();
                this.router.navigate(['/login']);
                location.reload();
            } else if (err.status === 403 || err.status === 404){
                if (err.error.error === 'Forbidden') {
                    localStorage.clear();
                    this.router.navigate(['/login', {queryParams: ''}]);
                }else {
                    this.router.navigate(['errorPage', {errorStatusCode: err.status}]);
                }
            } else if (err.status === undefined){
                this.router.navigate(['errorPage', {errorStatusCode: err.status}]);
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}

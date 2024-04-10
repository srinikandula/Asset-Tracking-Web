import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './main/authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalModule} from 'ngb-modal';
// import {Multiselect} from './customDirectives/multiSelect/multiselect.component';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {SpinnerInterceptor} from './interceptors/spinner.interceptor';
import {SpinnerService} from './spinner/spinner.service';
import {ErrorPageComponent} from './main/layout/error-page/error-page.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import {DatepickerModule, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './main/authentication/signup/signup.component';
// import { CusNgMultiselectComponent } from './customDirectives/cus-ng-multiselect/cus-ng-multiselect.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // Multiselect,
    SpinnerComponent,
    ErrorPageComponent,
    SignupComponent,
    // CusNgMultiselectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    // NgMultiSelectDropDownModule.forRoot(),
    NgxDatatableModule,
    ModalModule,
    NoopAnimationsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    // NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    // BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    NgCircleProgressModule.forRoot({
      outerStrokeColor: '#db2b30',
      innerStrokeColor: '#f8d5d6',
      animationDuration: 300,
    }),
    TimepickerModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    SpinnerService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

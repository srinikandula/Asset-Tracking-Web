import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalManager} from 'ngb-modal';
import {ApiServiceService} from '../../../services/api-service.service';
import {ApiUrls} from '../../../schemas/apiUrls';
import Swal from 'sweetalert2';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showAndHideText = 'password';
  public resetPasswordShowAndHideText = 'password';
  public resetConfirmPasswordShowAndHideText = 'password';
  clockDate = new Date();
  clockHour: any;
  clockMin: any;
  clockSec: any;
  setClockTime = new Date();
  subscription: any = Subscription

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalManager,
    private apiService: ApiServiceService,
    private apiUrls: ApiUrls
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }

  title: any = 'Login';
  // @ts-ignore
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  // @ts-ignore
  returnUrl: string;
  error = '';
  public currentUser: any;

  // Reset Password
  @ViewChild('passwordResetModal') passwordResetModal: any;
  public resetPhoneNumber: any;
  // public resetError: boolean;
  resetObj: any = {
    code: '',
    password: '',
    confirmPassword: ''
  };
  public errorMessage: any;
  public passwordErrorValid = false;
  public passwordSuccessValid = false;
  public passwordValid = false;
  public passwordConfirmValid = false;
  showSendCodeToMobile = false;
  resetErrors: Array<any> = [];
  showAndHide = false;
  PasswordShowAndHide =  false;
  confirmPasswordShowAndHide = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl)

    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.setClockTime = time;
      });
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.logIn(this.loginForm.value.phoneNumber, this.loginForm.value.password).pipe(first()).subscribe((data: any) => {
      this.router.navigate([this.returnUrl]);
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({icon: 'success', title: 'Login in successfully'});
    }, (error: any) => {
      this.error = error.message;
      this.loading = false;
    });
  }

  routingToSignup(): void {
    this.router.navigate(['signup']);
  }

  openResetPassModal(): void {
    this.modalService.open(this.passwordResetModal, {backdrop: 'static', backdropClass: 'backdropClass', keyboard: false});
  }

  resetClose(): void {
    this.errorMessage = '';
    this.resetErrors = [];
    this.showSendCodeToMobile = false;
    this.resetPhoneNumber = '';
    this.modalService.close(this.passwordResetModal);
  }

  resetPassword(phoneNumber: any): void {
    if (!phoneNumber) {
      this.errorMessage = 'Please enter Mobile Number';
    } else if (phoneNumber.length < 10) {
      this.errorMessage = 'Please enter 10 digit Mobile Number';
    } else {
      this.errorMessage = '';
      // this.apiService.get(this.apiUrls.sendPasswordResetCode + '?phoneNumber=' + phoneNumber).subscribe((res: any) => {
      //   if (res) {
      //     this.errorMessage = res.message;
      //     this.showSendCodeToMobile = true;
      //   }
      // }, (error) => {
      //   this.errorMessage = error.message;
      // });
    }
  }

  confirmPasswordC(password: string, confirmPassword: any): void {
    if (password !== confirmPassword) {
      this.passwordErrorValid = true;
      this.passwordSuccessValid = false;
      this.passwordValid = true;
      this.passwordConfirmValid = false;
      // return false;
    } else {
      this.passwordErrorValid = false;
      this.passwordSuccessValid = true;
      this.passwordValid = false;
      this.passwordConfirmValid = true;
    }
  }

  changePassword(): void {
    this.resetErrors = [];
    if (!this.resetObj.code) {
      this.resetErrors.push('Please enter the 6-digit code that has been sent to your registered Email.');
    } else if (this.resetObj.code.length < 6) {
      this.resetErrors.push('Must contain 6 digits');
    } else if (!this.resetObj.password) {
      this.resetErrors.push('Please enter Password');
    } else if (this.resetObj.password.length < 6) {
      this.resetErrors.push('Please Enter at least 6 characters');
    } else if (!this.resetObj.confirmPassword) {
      this.resetErrors.push('Please enter Confirm Password');
    } else if (this.passwordConfirmValid) {
      this.resetObj.phoneNumber = this.resetPhoneNumber;
      // this.apiService.update(this.apiUrls.resetUserPassword, this.resetObj).subscribe((res: any) => {
      //   if (res) {
      //     Swal.fire('Success', 'Password changed successfully', 'success');
      //     this.modalService.close(this.passwordResetModal);
      //     this.resetErrors = [];
      //     this.resetObj = {};
      //     this.resetPhoneNumber = '';
      //   }
      // }, (error) => {
      //   this.resetErrors.push(error.message);
      // });
    }
  }

  showAndHidePassword(showAndHide: any): void{
    if (showAndHide === true){
      this.showAndHideText = 'text';
    } else {
      this.showAndHideText = 'password';
    }
  }

  resetPasswordShowAndHide(showAndHide: any): void{
    if (showAndHide === true){
      this.resetPasswordShowAndHideText = 'text';
    } else {
      this.resetPasswordShowAndHideText = 'password';
    }
  }

  resetConfirmPasswordShowAndHide(showAndHide: any): void{
    if (showAndHide === true){
      this.resetConfirmPasswordShowAndHideText = 'text';
    } else {
      this.resetConfirmPasswordShowAndHideText = 'password';
    }
  }
}

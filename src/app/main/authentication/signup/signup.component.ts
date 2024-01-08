import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../services/api-service.service';
import {ApiUrls} from '../../../schemas/apiUrls';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public header: any;
    public roles = [{type: 'ASSOCIATE', name: 'Associate'},
        {type: 'DRIVER', name: 'Driver'},
        {type: 'DRIVER_AND_ASSOCIATE', name: 'Driver And Associate'},
        {type: 'PROCESS_ASSOCIATE', name: 'Process Associate'},
        {type: 'SHIFT_LEAD', name: 'Shift Lead'},
        {type: 'EMPLOYEE', name: 'Employee'}];
    public vehicleTypes: Array <any> = [];
    public showVehicleInfo = false;
    public query = {cityId: ''};
    public cities: any;
    public sites: Array<any> = [];
    signUpForm: any = FormGroup;
    user: any = {
        fullName: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
        userRole: '',
        cityId: '',
        siteId: '',
        preferredSiteLocation: '',
        vehicleType: '',
    };
    locationFieldAdd = false;
    maxDate = new Date();
    vehicleRegistrationNumberLabelError: any
  vehicleRegistrationNumberError = '';
    public errors: Array<any> = [];
    public serverErrors: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private formBuilder: FormBuilder,
                private router: Router,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.header = 'Signup';
        this.getAllCities();
        this.getAllSites('');
        this.signUpForm = this.formBuilder.group({
            fullName: ['', [Validators.required, Validators.minLength(5)]],
            mobileNo: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            dateOfBirth: ['', Validators.required],
            roleName: ['', Validators.required],
            cityName: ['', Validators.required],
            siteName: ['', Validators.required],
            vehicleTypeData: ['', Validators.required],
            siteLocationData: ['', Validators.required],
            // first: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)]],
            // second: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]{1,2}$/)]],
            // third: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,2}$/)]],
            // fourth: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
        });
        // this.apiService.getAllVehicleTypes().subscribe((res: any) => {
        //     this.vehicleTypes = res;
        // });
    }

    get f() {
        return this.signUpForm.controls;
    }

    getAllCities(): void {
        // this.apiService.create(this.apiUrls.getNoAuthCities, this.query).subscribe((res) => {
        //     if (res) {
        //         this.cities = res;
        //     }
        // });
    }

    getAllSites(cityId: any): void {
        if (cityId) {
            this.query.cityId = cityId;
        } else {
            this.query.cityId = '';
        }
        // this.apiService.create(this.apiUrls.getNoAuthSites, this.query).subscribe((res) => {
        //     if (res) {
        //         this.sites = res;
        //     }
        // });
    }

    changeUserRole(userRole: any): void {
        if (userRole === 'DRIVER_AND_ASSOCIATE' || userRole === 'DRIVER') {
            this.showVehicleInfo = true;
        } else {
            this.showVehicleInfo = false;
            this.user.firstValue = '';
            this.user.secondValue = '';
            this.user.thirdValue = '';
            this.user.fourthValue = '';
            this.user.vehicleRegNo = this.user.firstValue + '' +
                this.user.secondValue + '' + this.user.thirdValue + '' + this.user.fourthValue;
            this.user.vehicleType = '';
        }
    }

    selectOtherOption(siteValue: any): void {
        if (siteValue === 'other' || siteValue === 'No Site' || siteValue == null) {
            this.locationFieldAdd = true;
        }
    }

    backToLogin(): void {
        this.router.navigate(['login']);
    }

    combinedValue(): void {
        if (this.user.firstValue && this.user.fourthValue) {
            this.vehicleRegistrationNumberError = '';
            this.vehicleRegistrationNumberLabelError = 'isNotError';
        } else {
            // $scope.user.vehicleRegNo = ''
            this.vehicleRegistrationNumberLabelError = 'isError';
            this.user.vehicleDisplayName = '';
            this.vehicleRegistrationNumberError = 'Enter Valid Vehicle Number';
        }
    }

    userRegister(): void {
        this.errors = [];
        if (!this.user.fullName) {
            this.errors.push('Please enter Full Name');
        } else if (!this.user.phoneNumber) {
            this.errors.push('Please enter Phone Number');
        } else if (!this.user.dateOfBirth) {
            this.errors.push('Please select Date Of Birth');
        } else if (!this.user.userRole) {
            this.errors.push('Please select Role');
        } else if (!this.user.cityId) {
            this.errors.push('Please select City');
        } else if (!this.user.siteId) {
            this.errors.push('Please select City');
        } else if ((this.user.userRole === ('DRIVER' || 'DRIVER_AND_ASSOCIATE') && !this.user.vehicleType)) {
            this.errors.push('Please select Vehicle Type');
        } else {
            this.user.vehicleRegNoInParts = {
                part1: this.user.firstValue.toUpperCase(),
                part2: this.user.secondValue.toUpperCase(),
                part3: this.user.thirdValue.toUpperCase(),
                part4: this.user.fourthValue
            };
            // this.apiService.create(this.apiUrls.userRegistration, this.user).subscribe((res) => {
            //     if (res) {
            //         Swal.fire('Success', 'User Registered Successfully..!', 'success');
            //         this.router.navigate(['login']);
            //     }
            // }, (error) => {
            //     this.toastr.error(error.message);
            //     this.serverErrors = error;
            // });
        }

    }
}

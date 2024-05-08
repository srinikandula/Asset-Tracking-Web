import {Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: 'app-add-edit-asset',
  templateUrl: './add-edit-asset.component.html',
  styleUrls: ['./add-edit-asset.component.css']
})
export class AddEditAssetComponent implements OnInit {
  public assetTitle: any;
  public assetId: any
  public assetTicketNumberList: Array<any> = [];
  public invoiceNumberList: Array<any> = [];
  public sitesStore: Array<any> = [];
  dateOfCapitalisation = new Date();
  invoiceDate = new Date();
  startExpenseDate = new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + 1);
  assetQuery: any ={
    invoiceOrVoucherNo: '',
    amountBeforeTax: 0,
    additionalExpenses: 0,
    dateOfCapitalisation: '',
    siteId: '',
    attrs: {
      vendorName: ''
    },
    itemsList: [
      {
        serialNumber: '',
        model: ''

      }
    ],
    noOfRows: 1,
  }
  public assetErrors: Array<any> = [];
  taxArray: any = [{key: 'ITC claimed', value: 'ITC claimed'}, {key: 'Not Claimed', value: 'Not Claimed'}];
  previewUrl2: any;
  imageChangedEvent: any = ''
  private modalRef: any;
  @ViewChild('myModal2') myModal2: any;
  public currentUser: any;
  public imageUrls: any = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal,
              private toastr: ToastrService,
              private datePipe: DatePipe,
              ) {
    this.assetId = this.actRoute.snapshot.paramMap.get('id');
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    })
    this.assetQuery.dateOfCapitalisation = this.datePipe.transform(this.dateOfCapitalisation, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    this.assetQuery.itemsList = []
    this.getPaidVendorNumberDropDownForAddAsset();
    // this.getSitesForDropDownExpense();
    if (this.assetId){
      this.assetTitle = 'Edit Asset';
      this.getById();
    }else {
      this.assetTitle = 'Add Asset';
    }

  }
  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  getSitesForDropDownExpense(): void {
    this.apiService.get(this.apiUrls.getSitesDropDownForAsset).subscribe((res: any) => {
      if (res) {
        this.sitesStore = res;
        console.log(this.sitesStore, '====')
      }
    });
  }
  addItem() {
    this.assetQuery.itemsList.push({ serialNumber: '', model: '' });
  }

  initializeItemsList() {
    console.log(this.assetQuery.itemsList[0].quantity)
    for (let i = 0; i < this.assetQuery.itemsList[0].quantity; i++) {
      this.assetQuery.itemsList.push({ serialNumber: '', model: '' });
    }
  }
  deleteItem(index: any): void {
    if (this.assetQuery.itemsList.length === 1) {
      this.toastr.error('You can not Delete this (Please add at least one item)', 'Error');
    } else {
      this.assetQuery.itemsList.splice(index, 1);
      this.assetQuery.noOfRows = this.assetQuery.noOfRows - 1;
    }
  }
  onQuantityChange(): void {
    const currentQuantity = this.assetQuery.itemsList.quantity;
    const itemsCount = this.assetQuery.itemsList.length;

    if (currentQuantity > itemsCount) {
      const itemsToAdd = currentQuantity - itemsCount;
      for (let i = 0; i < itemsToAdd; i++) {
        this.assetQuery.itemsList.push({ serialNumber: '', model: '' });
      }
    } else if (currentQuantity < itemsCount) {
      const itemsToDelete = itemsCount - currentQuantity;
      this.assetQuery.itemsList.splice(currentQuantity, itemsToDelete);
    }
  }


  getPaidVendorNumberDropDownForAddAsset(): void{
    this.apiService.get(this.apiUrls.getPaidVendorNumberDropDownForAddAsset).subscribe((res: any) => {
      if (res){
        this.assetTicketNumberList = res;
      }
    })
  }
  getDataForTicketNumber(vendorNumber: any): void{
    this.apiService.get(this.apiUrls.getVendorPaymentByVendorNumber + vendorNumber).subscribe((res: any) => {
      if (res){
        // this.assetQuery = res;
        this.assetQuery.assetCategory = res.expenseType;
        this.assetQuery.assetSubCategory = res.expenseSubType;
        this.assetQuery.attrs.vendorName = res.attrs.vendorName;
        this.assetQuery.attrs.assetDocUrl = res.attrs.assetDocUrl;
        this.assetQuery.attrs.vendorDocUrl = res.attrs.vendorDocUrl;
        this.assetQuery.invoiceNumber = res.invoiceOrVoucherNo;
        this.assetQuery.amountBeforeTax = res.preGstAmount;
        this.assetQuery.additionalExpenses = res.additionalExpenses;
        this.assetQuery.description = res.description;
        this.assetQuery.invoiceDate = res.invoiceDate;
        this.assetQuery.indentNumber = res.indentNumber;
        this.assetQuery.siteId = res.siteId;
        this.assetQuery.vendorId = res.vendorId;
        this.assetQuery.attrs.siteNames = res.attrs.siteNames
        this.assetQuery.gstAmount = res.gstAmount;
        this.assetQuery.totalAmount = res.totalAmount;
        this.assetQuery.itemsList.quantity = res.attrs.quantity;

        // Pushing image URLs into the array
        this.imageUrls.push(this.assetQuery.attrs.vendorDocUrl);
        this.imageUrls.push(this.assetQuery.attrs.assetDocUrl);

        console.log(this.imageUrls);
        for (let i = 0; i < this.assetQuery.itemsList.quantity; i++) {
          this.assetQuery.itemsList.push({ serialNumber: '', model: '' });
        }
        // this.invoiceNumberForCapitalisation(res.invoiceOrVoucherNo)
        // this.initializeItemsList();
      }
    })
  }
  invoiceNumberForCapitalisation(invoiceNumber: any): void{
    this.apiService.get(this.apiUrls.invoiceNumberForCapitalisation + invoiceNumber,).subscribe((res: any) => {
      if (res){
        this.assetQuery.vendorName = res.vendorName;
        this.assetQuery.capitalisedValue = Number(res.additionalExpenses) + Number(res.preGstAmount) + Number(res.gstAmount)
      }
    })
  }

  saveAsset() {
    this.assetQuery.dateOfCapitalisation = this.datePipe.transform(this.dateOfCapitalisation, 'yyyy-MM-dd');
    console.log(this.assetQuery.dateOfCapitalisation)
    if (this.currentUser.role === 27){
      const capitalisedValueToSend = this.assetQuery.capitalisedValue !== undefined ? this.assetQuery.capitalisedValue : 0;
      const tax = (this.assetQuery.tax !== undefined && this.assetQuery.tax !== null)  ? this.assetQuery.tax : '';
    const payload = {
      tax: tax,
      capitalisedValue: capitalisedValueToSend,
      dateOfCapitalisation: this.assetQuery.dateOfCapitalisation,
      serialNumber: this.assetQuery.serialNumber,
      model: this.assetQuery.model,
    }
      this.apiService.getAll(this.apiUrls.assetConfirmation + this.assetId, payload).subscribe((res: any) => {
        if (res){
          swal.fire('Success!', 'Confirmed Successfully  ' , 'success');
          this.router.navigate(['Asset']);
        }

      }, error => {
        this.assetErrors = error;
      })
    } else {
      this.apiService.getAll(this.apiUrls.addAssetApi, this.assetQuery).subscribe((res: any) => {
        if (res){
          swal.fire('Success!', 'Asset Added Successfully  ' , 'success');
          this.router.navigate(['Asset']);
        }
      }, error => {
        this.assetErrors = error;
      })
    }

  }

  getById(): void {
    this.apiService.get(this.apiUrls.getForAssetById + this.assetId).subscribe((res: any) => {
      if (res) {
        this.assetQuery = res;
        this.imageUrls.push(this.assetQuery.attrs.assetDocUrl);
       this. imageUrls.push(this.assetQuery.attrs.vendorDocUrl);
        this.invoiceNumberForCapitalisation(res.invoiceNumber)
      }
    }, error => {
      this.assetErrors = error
    })
  }

  onClick(event: any): void {
    this.previewUrl2 = event;
    this.imageChangedEvent = event;
    this.modalRef = this.ngModalService.open(this.myModal2, {size: 'lg', backdrop: 'static', keyboard: false});
  }

  cancel(): void {
    this.router.navigate(['Asset']);
  }

  close(): void {
    this.ngModalService.dismissAll(this.modalRef);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnlynumberDirective} from "../../../../customDirectives/onlynumber.directive";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-asset-requisition-form',
  templateUrl: './asset-requisition-form.component.html',
  styleUrls: ['./asset-requisition-form.component.css']
})
export class AssetRequisitionFormComponent implements OnInit {
  public assetCount: any;
  public getAllAssetList: any;
  public currentUser: any;
  data: any = {
    page: 1,
    size: 10,
    pageSizes: [],
  };
  public assetQuery: any = {
    model: '',
    description: '',
    assetCategory: '',
    assetSubCategory: '',
    quantity: 0
  }
  expandedRows: boolean[] = [];
  selectedRowData: any;
  public assetCategoryTypes: Array<any> = [];
  public assetSubCategoryTypes: Array<any> = [];
  public sitesStore: Array<any> = [];
  custodianDetails: any;
  public assetRequisitionId: any;
  public initiatePo: any = {
    vendorName: '',
    vendorPhoneNumber: '',
    vendorEmail: '',
    beneficiaryName: '',
    accountNumber: '',
    ifscCode: '',
    billingAddress: '',
    shippingAddress: '',
    billToEmail: '',
    shipToEmail: '',
    terms: '',
    warranty: '',
    Rate: 0,
    preGstAmount: 0,
    gstAmount: 0,
    additionalExpenses: 0,
    totalAmount: 0,
    vendorGstNumber: '',
    vendorAddress: ''
  }
  public poData: any = {};
  public checkStatus = {
    fieldBoo: false,
    staticBoo: false
  }
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      // console.log(this.currentUser)
    });
  }

  ngOnInit(): void {
    this.getCount();
    // this.getSitesForDropDownExpense();
    // this.getAllCategory();
  }
  getAll(): void{
    this.apiService.getAll(this.apiUrls.getAllAssets, this.data).subscribe((res: any) => {
      if (res){
        this.getAllAssetList = res.content
      }
    });
  }
  getCount(): void{
    this.apiService.getCount(this.apiUrls.getAssetCount, this.data).subscribe((res: any) => {
      if (res){
        this.assetCount = res;
        OnlynumberDirective.pagination(this.assetCount, this.data);
        this.getAll();
      }
    })

  }

  deleteAsset(id: any):void{
    this.apiService.update(this.apiUrls.deleteAsset + id, {}).subscribe((res: any) => {
      if (res){
       this.getCount();
      }
    })
  }
  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  handlePageChange(event: any): void {
    this.data.page = event;
    this.getCount();
  }

  handlePageSizeChange(event: any): void {
    this.data.size = event;
    this.data.page = 1;
    this.getCount()
  }

  commit(asset: any):void {
    this.apiService.update(this.apiUrls.changeStatus + asset.id, {}).subscribe((res: any) => {
      if (res){
        this.getCount();
      }
    })
  }
  getAllCategory(): void{
    this.apiService.get(this.apiUrls.getAllCategories).subscribe((res: any) => {
      if (res){
        this.assetCategoryTypes = res;
      }
    })
  }
  getAllSubCategory(): void{
    this.apiService.get(this.apiUrls.getAllSubCategories + '?category=' + this.assetQuery.assetCategory).subscribe((res: any) => {
      if (res){
        this.assetSubCategoryTypes = res;
      }
    })
  }
  getSitesForDropDownExpense(): void {
    this.apiService.getSites('').subscribe((res: any) => {
      if (res) {
        this.sitesStore = res;
      }
    });
  }
  // toggleRowExpand(index: number): void {
  //   this.expandedRows[index] = !this.expandedRows[index];
  //
  //   // Collapse other rows when expanding a new row
  //   if (this.expandedRows[index]) {
  //     this.expandedRows = this.expandedRows.map((_, i) => i === index);
  //   }
  // }
  toggleRowExpand(index: number, rowData: any): void {
    this.assetRequisitionId = rowData.id
    this.expandedRows[index] = !this.expandedRows[index];

    // Store the selected row's data when expanding
    if (this.expandedRows[index]) {
      this.assetQuery = rowData;
      this.getById()
    } else {
      this.assetQuery = null;
    }

    // Collapse other rows when expanding a new row
    if (this.expandedRows[index]) {
      this.expandedRows = this.expandedRows.map((_, i) => i === index);
    }
  }
  getById(): void{
    this.apiService.get(this.apiUrls.getAssetById + this.assetRequisitionId).subscribe((res: any) => {
      if (res){
        this.getAllCategory()
        this.getAllSubCategory();
        this.getSitesForDropDownExpense();
        this.assetQuery = res;
      }
    })
  }
  getStatusClass(currentStatus: string): string {
    switch (currentStatus) {
      case 'COMMITTED':
        // OM_PENDING
        return 'inactive';
      case 'APPROVED':
        return 'inactive';
      case 'SIGNED_OFF':
        return 'inactive';
        // Add more cases for other statuses as needed
      default:
        return '';
    }
  }

  getStatusCheck(id: any, status: any, nextStatus: any): any {
    if (id === this.currentUser.id && this.currentUser.role === 26) {
      if (nextStatus === 'OM_PENDING') {
        this.checkStatus.fieldBoo = true;
        this.checkStatus.staticBoo = false;
      } else {
        this.checkStatus.fieldBoo = false;
        this.checkStatus.staticBoo = true;
      }
    } else if (id === this.currentUser.id && this.currentUser.role === 31) {
      console.log('om')
      if (nextStatus === 'RM_PENDING') {
        this.checkStatus.fieldBoo = true;
        this.checkStatus.staticBoo = false;
      } else {
        this.checkStatus.fieldBoo = false;
        this.checkStatus.staticBoo = true;
      }
    } else if (id === this.currentUser.id && this.currentUser.role === 40) {
      console.log('rm')
      if (nextStatus === 'VL_PENDING') {
        this.checkStatus.fieldBoo = true;
        this.checkStatus.staticBoo = false;
      } else {
        this.checkStatus.fieldBoo = false;
        this.checkStatus.staticBoo = true;
      }
    } else if (id === this.currentUser.id && this.currentUser.role === 76) {
      console.log('vl')
      if ((nextStatus === 'INITIATE_PO')) {
        this.checkStatus.fieldBoo = true;
        this.checkStatus.staticBoo = false;
      } else {
        this.checkStatus.staticBoo = true;
      }
    } else {
      this.checkStatus.fieldBoo = false;
      this.checkStatus.staticBoo = true;
    }
    return this.checkStatus
  }

  addPurchasingFun(asset: any) {
    const combinedPayload = {
      ...this.initiatePo,
      ...this.assetQuery
    };

    console.log(123456)
    this.apiService.update(this.apiUrls.addPurchasingOrder + asset.id, {...this.initiatePo, ...this.assetQuery.description, ...this.assetQuery.quantity}).subscribe((res: any) => {
      if (res){

      }
    })
  }
  pdfData(): void{
    this.apiService.get(this.apiUrls.getPoGenerated + this.assetRequisitionId).subscribe((res: any) => {
      if (res){
        this.pdfDownload(res);
      }
    })
  }
  pdfDownload(data: any): void {
    if (data) {
      this.poData = data;
      console.log(this.poData)
      console.log(data);
      const elementToPrint = document.getElementById('pdfTable'); // The html element to become a pdf
      const opt = {
        margin: 0.5,
        filename: data.name + '.pdf',
        image: {type: 'jpeg', quality: 0.20},
        html2canvas: {
          quality: 1,
          dpi: 192,
          scale: 2,
          allowTaint: true,
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          backgroundColor: '#ffffff'
        },
        // pagebreak: {mode: 'avoid-all', before: '#QRImage'},
        jsPDF: {unit: 'cm', format: 'a4', orientation: 'portrait'}
      };
      html2pdf().from(elementToPrint).set(opt).save();
    }
  }
}

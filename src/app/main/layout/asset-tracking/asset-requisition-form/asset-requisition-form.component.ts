import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnlynumberDirective} from "../../../../customDirectives/onlynumber.directive";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import { ModalManager } from 'ngb-modal';
import swal from "sweetalert2";

@Component({
  selector: 'app-asset-requisition-form',
  templateUrl: './asset-requisition-form.component.html',
  styleUrls: ['./asset-requisition-form.component.css']
})
export class AssetRequisitionFormComponent implements OnInit {
  tab = 1;
  public assetCount: any;
  public getAllAssetList: any;
  public currentUser: any;
  public rejectedList: any;
  public rejectCount: any;
  public viewRejectAssetDetails: any;
  data: any = {
    page: 1,
    size: 10,
    pageSizes: [],
  };
  rejectQuery: any = {
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
    vendorAddress: '',
    panCardNumber: ''
  }
  public poData: any = {};
  public checkStatus = {
    fieldBoo: false,
    staticBoo: false
  }

  public uploadPanPicDemo: any;
  public previewUrl2: any;
  public imageChangedEvent: any = '';
  public imageArray: Array<any> = [];
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModal2') myModal2: any;
  @ViewChild('viewRejectModal') viewRejectModal: any;
  public modalRef: any;
  public custodianUploadData: any = {};
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal,
              public modelService: ModalManager,) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser)
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
  getAllRejects(): void{
    this.apiService.getAll(this.apiUrls.getRejectRequestForm, this.rejectQuery).subscribe((res: any) => {
      if (res){
        this.rejectedList = res.content;
      }
    })
  }
  getCountForReject(): void{
    this.apiService.getCount(this.apiUrls.getRejectRequestFormCount, this.data).subscribe((res: any) => {
      if (res){
        this.rejectCount = res;
        OnlynumberDirective.pagination(this.rejectCount, this.rejectQuery);
        this.getAllRejects();
      }
    })

  }
  viewAsset(reject: any): void{
    this.viewRejectAssetDetails = reject;
    console.log(this.viewRejectAssetDetails, '===========')
    if (this.viewRejectAssetDetails) {
      this.modalRef = this.ngModalService.open(this.viewRejectModal, {size: 'lg', backdrop: 'static', keyboard: false});
    }
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
  changeTab(tabKey: any): void {
    this.tab = tabKey ? tabKey : 1;
    switch (this.tab) {
      case 1:
        this.getCount()
        break;
      case 2:
        this.getCountForReject()
        break;
      default:
        break;
    }
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
        this.getCustodianDetails();
        this.assetQuery = res;
        // this.assetQuery.custodianId = res.custodianId;
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
    console.log(nextStatus, '-------------------------')
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
        console.log(123456)
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
  getCustodianDetails(): void{
    console.log(this.assetQuery.siteId);
    this.apiService.get(this.apiUrls.getCustodianDetails + 'id='  + this.assetQuery.siteId).subscribe((res: any) => {
      if (res){
        this.custodianDetails = res;
        // this.assetQuery.custodianName = res[0].custodianName;
        // this.assetQuery.custodianNumber = res[0].custodianNumber;

        // console.log(this.custodianDetails)
      }
    })
  }
  onClick(event: any): void {
    this.previewUrl2 = event;
    this.imageChangedEvent = event;
    this.modalRef = this.ngModalService.open(this.myModal2, {size: 'lg', backdrop: 'static', keyboard: false});
  }


  uploadImage(event: any): void {
    const reader = new FileReader();
    if (!event.imageData) {
    } else {
      const obj: any = {
        file: '',
        subUrl: '',
        picName: '',
      };
      for (let i = 0; i < this.imageArray.length; i++) {
        if (this.imageArray[i].picName === event.uploadName) {
          this.imageArray.splice(i, 1);
        }
      }
      console.log(this.imageArray)
      switch (event.uploadName) {
        case 'uploadAssetDocument':
          obj.picName = event.uploadName;
          obj.subUrl = 'api/v1/assetTracking/indent/uploadAssetDocument?id=';
          obj.file = event.imageData;
          reader.readAsDataURL(obj.file);
          console.log(obj.file)
          reader.onload = () => {
            this.uploadPanPicDemo = reader.result;
          };
          this.imageArray.push(obj);
          break;
      }
      console.log(this.custodianUploadData)
    }
    // this.preview();
  }

  ackUpload(): void{
    // this.imageArray = [];
    // this.custodianUploadData.invoiceNumber = '';
    // this.custodianUploadData.qty= ''
    // this.uploadPanPicDemo = ''
    this.apiService.get(this.apiUrls.addCustodianQtyAndInvoiceNumber
        + this.assetRequisitionId
        +  '&qty=' + this.custodianUploadData.qty
        + '&invoiceNumber=' + this.custodianUploadData.invoiceNumber).subscribe((res: any) => {
          if (res){
            let i: any;
            for (i = 0; i < this.imageArray.length; i++) {
              console.log(this.imageArray, '================')
              this.apiService.imageUpload(this.imageArray[i].subUrl
                  + this.assetRequisitionId
                  +  '&qty=' + this.custodianUploadData.qty
                  + '&invoiceNumber=' + this.custodianUploadData.invoiceNumber,
                  this.imageArray[i].file).subscribe
              ((response: any) => {
                if (response) {
                  if (i === this.imageArray.length) {
                    console.log(this.imageArray, '==========image Array');
                    swal.fire('Success!', 'Invoice Uploaded Successfully  ' , 'success');
                    this.router.navigate(['AssetTracking/assetRequisitionForm']);
                  }
                }
              });
            }
            this.ngModalService.dismissAll();
          }
    })
  }
  acknowledgeOpenPopUp(data: any) {
    this.modalRef = this.ngModalService.open(this.myModal, {size: 'md', backdrop: 'static', keyboard: false});
  }
  close(): void{
    this.ngModalService.dismissAll();
    this.imageArray = [];
    this.custodianUploadData.invoiceNumber = '';
    this.custodianUploadData.qty= ''

  }
  getVendorPanDetail(): void {
    if (this.initiatePo.panCardNumber.length === 10) {
      this.apiService.get(this.apiUrls.getVendorDetailsByPan  + this.initiatePo.panCardNumber)
          .subscribe((res: any) => {
            if (res) {
              this.initiatePo = res;
            }
          });
    }
  }
  rejectAsset(asset: any): void{
    this.apiService.update(this.apiUrls.rejectRequestForm + asset.id, {}).subscribe((res: any) => {
      if (res){
        this.getCount()
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

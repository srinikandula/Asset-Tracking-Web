import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-edit-asset-requisition-form',
  templateUrl: './add-edit-asset-requisition-form.component.html',
  styleUrls: ['./add-edit-asset-requisition-form.component.css']
})
export class AddEditAssetRequisitionFormComponent implements OnInit {
  public currentUser: any = {};
  public assetRequisitionTitle = 'Asset Requisition';
  public assetRequisitionId = '';
  public assetCategoryTypes: Array<any> = [];
  public assetSubCategoryTypes: Array<any> = [];
  public sitesStore: Array<any> = [];
  public assetQuery: any = {
    model: '',
    description: '',
    assetCategory: '',
    assetSubCategory: '',
    category: '',
    custodianName: '',
    quantity: 0
  }
  custodianDetails: any;
  allErrors: any = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
    this.assetRequisitionId= this.actRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getSitesForDropDownExpense();
    if (this.assetRequisitionId){
      this.getById();
    }else {
    }
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
    this.apiService.get(this.apiUrls.getSitesDropDownForAsset).subscribe((res: any) => {
      if (res) {
        this.sitesStore = res;
      }
    });
  }

  addorUpdateAsset() {
    console.log(this.allErrors)
    if (this.assetRequisitionId) {
      this.apiService.update(this.apiUrls.updateAsset  +  this.assetRequisitionId, this.assetQuery).subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.router.navigate(['AssetTracking/assetRequisitionForm']);
        }
      }, error => {
        this.allErrors = error;
      })
    } else {
      this.apiService.getAll(this.apiUrls.addAsset, this.assetQuery).subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.router.navigate(['AssetTracking/assetRequisitionForm']);
        }
      }, error => {
        this.allErrors = error;
      })
    }
  }
  getById(): void{
    this.apiService.get(this.apiUrls.getAssetById + this.assetRequisitionId).subscribe((res: any) => {
      if (res){
        console.log(res);
        this.assetQuery = res;
        this.getAllCategory()
        this.getAllSubCategory();
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
  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  cancel(): void {
    this.router.navigate(['AssetTracking/assetRequisitionForm']);
  }
}

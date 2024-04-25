import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

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
    assetSubCategory: [],
    category: '',
    custodianName: '',
    quantity: 0,
    itemsList: [
        {
          assetSubCategory: '',
          quantity: 0,
          serialNumber: 0
        }
    ]
  }
  custodianDetails: any;
  allErrors: any = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal,
              private toastr: ToastrService,) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
    this.assetRequisitionId= this.actRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.assetQuery.itemsList = [];
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
    let serialNumber = 1;

    // Loop through each item in itemsList to assign serial numbers
    this.assetQuery.itemsList.forEach((item: any) => {
      // Assign serial number to the item
      item.serialNumber = serialNumber;
      // Increment serial number for the next item
      serialNumber++;
    });
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
      this.apiService.create(this.apiUrls.addAsset, this.assetQuery).subscribe((res: any) => {
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
        this.assetQuery.shippingAddress = res[0].siteAddress;
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

  pushItemLists() {
    console.log(this.assetQuery.assetSubCategory);

    // Ensure itemsList is initialized as an array
    if (!this.assetQuery.itemsList) {
      this.assetQuery.itemsList = [];
    }

    // Iterate over each selected item
    this.assetQuery.assetSubCategory.forEach((selectedItem: any) => {
      // Check if the item is already present in itemsList
      const isItemInList = this.assetQuery.itemsList.some((item: any) => item.assetSubCategory === selectedItem);

      // If the item is not already in the list, add it with quantity 0
      if (!isItemInList) {
        this.assetQuery.itemsList.push({
          assetSubCategory: selectedItem,
          quantity: 0,
        });
      }
    });

    // Remove items from itemsList that are not present in assetSubCategory
    this.assetQuery.itemsList = this.assetQuery.itemsList.filter((item: any) =>
        this.assetQuery.assetSubCategory.includes(item.assetSubCategory)
    );
  }




  deleteItem(index: any): void {
    if (this.assetQuery.itemsList.length === 1) {
      this.toastr.error('You can not Delete this (Please add at least one item)', 'Error');
    } else {
      this.assetQuery.itemsList.splice(index, 1);
      this.assetQuery.noOfRows = this.assetQuery.noOfRows - 1;
    }
  }
  selectAll(str: any): void {
    if (str === 'subCatStore') {
      this.assetQuery.assetSubCategory = this.assetSubCategoryTypes.map(x => x.id);
    }
  }
  unselectAll(rstr: any): void {
    if (rstr === 'subCatStore') {
      this.assetQuery.assetSubCategory = [];
    }
  }

  cloneItem(i: number, assetSubCategory: any) {
    this.assetQuery.itemsList.splice(i + 1, 0, {
      assetSubCategory: assetSubCategory,
      quantity: 0
    })
  }
  cloneRow(i: any, assetSubCategory: any) {
    this.assetQuery.itemsList.splice(i + 1, 0, {
      assetSubCategory: assetSubCategory,
      quantity: 0
    })
  }
}

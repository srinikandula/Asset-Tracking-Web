import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {ApiServiceService} from "../../../services/api-service.service";
import {ApiUrls} from "../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnlynumberDirective} from "../../../customDirectives/onlynumber.directive";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  @ViewChild('viewAssetDetails') viewAssetDetails: any;
  public listOfasset: any
  public AssetListCount: any;
  public activeListCount: any;
  public activeListData: any;
  public assetCategoryTypes: Array<any> = [];
  public assetSubCategoryTypes: Array<any> = [];
  public sitesStore: Array<any> = [];
 query: any = {
   page: 1,
   size: 10,
   pageSizes: [],
   assetNumber: '',
   assetCategory: '',
   assetSubCategory: [],
   siteId: ''
}
  activeQuery: any = {
   page: 1,
   size: 10,
   count: 0,
   pageSizes: [],
    assetCategory: '',
    assetSubCategory: [],
    siteId: ''
}
  public currentUser: any;
  public tab = 2;
  assetDetails: any;
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser)
    });
  }

  ngOnInit(): void {
    if (this.tab === 2){
      this.getCount();
      this.getAllCategory();
      this.getSitesForDropDownExpense();
    }else {
      this.getActiveCount()
      this.getAllCategory();
      this.getSitesForDropDownExpense();
    }
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  getCount(): void{
    console.log(this.query)
    this.apiService.getAll(this.apiUrls.countAssets, this.query).subscribe((res: any) =>{
      // if (res){
        // this.AssetListCount = res;
        this.getAll()
        OnlynumberDirective.pagination(res, this.query);
      // }
    })
  }
  getAll(): void{
   this.apiService.getAll(this.apiUrls.searchAssets, this.query).subscribe((res: any) => {
     if (res){
       this.listOfasset = res.content;
       this.query.count = res.totalElements
     }
   })
  }

  getActiveCount(): void{
    this.apiService.getAll(this.apiUrls.countActiveAssets, this.activeQuery).subscribe((res: any) =>{
      // if (res > 0){
        this.activeListCount = res;
          this.getAllActiveTab()
        OnlynumberDirective.pagination(res, this.activeQuery);
      // }
    })
  }
  getAllActiveTab(): void{
   this.apiService.getAll(this.apiUrls.searchActiveAssets, this.activeQuery).subscribe((res: any) => {
     if (res){
       this.activeListData = res.content;
       this.activeQuery.count = res.totalElements
     }
   })
  }


  handlePageChange(event: any): void {
    this.query.page = event;
    this.getCount();
  }

  handlePageSizeChange(event: any): void {
    this.query.size = event;
    this.query.page = 1;
    this.getCount();
  }

  activehandlePageChange(event: any): void {
    this.activeQuery.page = event;
    this.getActiveCount();
  }

  activehandlePageSizeChange(event: any): void {
    this.activeQuery.size = event;
    this.activeQuery.page = 1;
    this.getActiveCount();
  }
  changeTab(tabKey: any): void {
    this.tab = tabKey ? tabKey : 1;
    switch (this.tab) {
      case 1:
        this.getActiveCount()
        break;
      case 2:
        this.getCount()
        break;
      default:
        break;
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
    if (this.tab === 2){
      this.apiService.get(this.apiUrls.getAllSubCategories + '?category=' + this.query.assetCategory).subscribe((res: any) => {
        if (res){
          this.assetSubCategoryTypes = res;
        }
      })
    }else{
      this.apiService.get(this.apiUrls.getAllSubCategories + '?category=' + this.activeQuery.assetCategory).subscribe((res: any) => {
        if (res){
          this.assetSubCategoryTypes = res;
        }
      })
    }

  }

  getSitesForDropDownExpense(): void {
    this.apiService.get(this.apiUrls.getSitesDropDownForAsset).subscribe((res: any) => {
      if (res) {
        this.sitesStore = res;
      }
    });
  }
  viewAssetData(asset: any): void {
    this.ngModalService.open(this.viewAssetDetails, {size: 'lg', backdrop: 'static', keyboard: false});
    this.assetDetails = asset;
  }

  pendingExcelExport(): void {
    this.apiService.exportExcel('pendingExcelExportTable', 'Pending_Asset_Export', '', '12');
  }
  activeExcelExport(): void {
    this.apiService.exportExcel('activeExcelExportTable', 'Active_Asset_Export', '', '12');
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {ApiServiceService} from "../../../../services/api-service.service";
import {ApiUrls} from "../../../../schemas/apiUrls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OnlynumberDirective} from "../../../../customDirectives/onlynumber.directive";

@Component({
  selector: 'app-asset-requisition-form',
  templateUrl: './asset-requisition-form.component.html',
  styleUrls: ['./asset-requisition-form.component.css']
})
export class AssetRequisitionFormComponent implements OnInit {
  public assetCount: any;
  public getAllAssetList: any;
  data: any = {
    page: 1,
    size: 10,
    pageSizes: [],
  };
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public  apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private ngModalService: NgbModal) { }

  ngOnInit(): void {
    this.getCount();
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
}

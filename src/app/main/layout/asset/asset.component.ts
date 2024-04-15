import { Component, OnInit } from '@angular/core';
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
  public listOfasset: any
  public AssetListCount: any;
 query = {
   page: 1,
   size: 10,
   count: 0,
   pageSizes: [],
}
  public currentUser: any;
  public tab = 2;
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
   this.getCount();
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  getCount(): void{
    this.apiService.getAll(this.apiUrls.countAssets, this.query).subscribe((res: any) =>{
      if (res > 0){
        this.AssetListCount = res;
          this.getAll()
        OnlynumberDirective.pagination(res, this.query);
      }
    })
  }
  getAll(): void{
   this.apiService.getAll(this.apiUrls.searchAssets, this.query).subscribe((res: any) => {
     if (res){
       this.listOfasset = res.content;
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
  changeTab(tabKey: any): void {
    this.tab = tabKey ? tabKey : 1;
    switch (this.tab) {
      case 1:
        // this.getCount()
        break;
      case 2:
        this.getCount()
        break;
      default:
        break;
    }
  }
}

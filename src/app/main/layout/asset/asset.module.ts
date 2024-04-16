import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import {AssetComponent} from "./asset.component";
import {AddEditAssetComponent} from "./add-edit-asset/add-edit-asset.component";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";


@NgModule({
  declarations: [
      // AssetComponent,
      // AddEditAssetComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
    BsDatepickerModule,
    AssetRoutingModule,
    NgbPaginationModule,
  ],
  providers: [],
})
export class AssetModule { }

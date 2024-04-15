import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {LayoutComponent} from './layout.component';
// import { ProcessingFeeComponent } from './payouts/processing-fee/processing-fee.component';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AssetTrackingComponent } from './asset-tracking/asset-tracking.component';
import { AssetComponent } from './asset/asset.component';
import { AddEditAssetComponent } from './asset/add-edit-asset/add-edit-asset.component';
import {AssetTrackingModule} from "./asset-tracking/asset-tracking.module";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
// import {FilterComponent} from './filters/filter/filter.component';

@NgModule({
    declarations: [
        LayoutComponent,
        AssetTrackingComponent,
        AssetComponent,
        AddEditAssetComponent,
        // ProcessingFeeComponent,
        // FilterComponent
    ],
    exports: [
        // FilterComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        NgSelectModule,
        NgbModule,
        AssetTrackingModule,
        BsDatepickerModule,
        // BsDatepickerModule
    ]
})
export class LayoutModule { }

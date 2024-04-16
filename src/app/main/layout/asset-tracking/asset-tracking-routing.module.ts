import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetTrackingComponent} from "./asset-tracking.component";
import {AssetRequisitionFormComponent} from "./asset-requisition-form/asset-requisition-form.component";
import {
  AddEditAssetRequisitionFormComponent
} from "./add-edit-asset-requisition-form/add-edit-asset-requisition-form.component";

const routes: Routes = [
  {
    path: '',
    component: AssetTrackingComponent,
    data: {expectedRole: [26, 31, 40, 70, 72, 74, 78, 80, 45, 76]},
  },
  {
    path: 'assetRequisitionForm',
    component: AssetRequisitionFormComponent,
    data: {expectedRole: [26, 31, 40, 70, 72, 74, 78, 80, 45, 76]},
  },
  {
    path: 'assetRequisitionForm/add',
    component: AddEditAssetRequisitionFormComponent,
    data: {expectedRole: [26, 31, 40, 70, 72, 74, 78, 80, 45, 76]},
  },
  {
    path: 'assetRequisitionForm/edit/:id',
    component: AddEditAssetRequisitionFormComponent,
    data: {expectedRole: [26, 31, 40, 70, 72, 74, 78, 80, 45, 76]},
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTrackingRoutingModule { }

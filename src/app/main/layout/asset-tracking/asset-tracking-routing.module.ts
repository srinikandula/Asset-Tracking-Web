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
    data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 74, 72, 43, 78, 47,80, 70, 76]},
  },
  {
    path: 'assetRequisitionForm',
    component: AssetRequisitionFormComponent,
    data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 74, 72, 43, 78, 47,80, 70, 76]},
  },
  {
    path: 'assetRequisitionForm/add',
    component: AddEditAssetRequisitionFormComponent,
    data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 74, 72, 43, 78, 47,80, 70, 76]},
  },
  {
    path: 'assetRequisitionForm/edit/:id',
    component: AddEditAssetRequisitionFormComponent,
    data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 74, 72, 43, 78, 47,80, 70, 76]},
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTrackingRoutingModule { }

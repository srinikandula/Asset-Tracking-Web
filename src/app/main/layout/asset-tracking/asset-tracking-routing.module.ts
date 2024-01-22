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
    component: AssetTrackingComponent
  },
  {
    path: 'assetRequisitionForm',
    component: AssetRequisitionFormComponent
  },
  {
    path: 'assetRequisitionForm/add',
    component: AddEditAssetRequisitionFormComponent
  },
  {
    path: 'assetRequisitionForm/edit/:id',
    component: AddEditAssetRequisitionFormComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTrackingRoutingModule { }

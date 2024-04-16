import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./asset.component";
import {AddEditAssetComponent} from "./add-edit-asset/add-edit-asset.component";

const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    data: {expectedRole: [27, 29, 74, 45]},
  },
  {
    path: 'AddAsset',
    component: AddEditAssetComponent,
    data: {expectedRole: [27, 29, 74, 45]},
  },
  {
    path: 'EditAsset/:id',
    component: AddEditAssetComponent,
    data: {expectedRole: [27, 29, 74, 45]},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }

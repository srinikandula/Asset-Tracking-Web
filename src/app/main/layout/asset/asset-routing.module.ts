import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./asset.component";
import {AddEditAssetComponent} from "./add-edit-asset/add-edit-asset.component";

const routes: Routes = [
  {
    path: '',
    component: AssetComponent
  },
  {
    path: 'AddAsset',
    component: AddEditAssetComponent,
  },
  {
    path: 'EditAsset/:id',
    component: AddEditAssetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }

import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiUrls {

    // mainUrl = 'http://localhost:8090/';
    //  mainUrl = 'http://192.168.0.105:8090/';
    mainUrl = 'http://10.72.25.219:8090/';
    // mainUrl = environment.testPath;
    // mainUrl = 'https://sapi.whizzard.in/';



//     Asset Requisition Form Api's
    getAllAssets = 'api/v1/assetTracking/indent/searchRequestForm';
    getAssetCount = 'api/v1/assetTracking/indent/countRequestForm'
    getAllCategories = 'api/v1/assetTracking/asset/getAllCategory'
    getAllSubCategories = 'api/v1/assetTracking/asset/getAllSubCategory'
    addAsset = 'api/v1/assetTracking/indent/addRequestForm';
    updateAsset = 'api/v1/assetTracking/indent/addPurchasingOrder/'
    getAssetById = 'api/v1/assetTracking/indent/getRequestFormBasedOnId?id='
    deleteAsset = 'api/v1/assetTracking/indent/deleteRequestForm?id='
    changeStatus = 'api/v1/assetTracking/indent/changeStatusOfRequestForm?id=';
    addPurchasingOrder = 'api/v1/assetTracking/indent/addPurchasingOrder/'
    getPoGenerated ='api/v1/assetTracking/indent/getPoGenerated?id='
}

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
    getAllAssets = 'api/v1/assetTracking/searchIndent';
    getAssetCount = 'api/v1/assetTracking/countIndent'
    getAllCategories = 'api/v1/assetTracking/getAllCategory'
    getAllSubCategories = 'api/v1/assetTracking/getAllSubCategory'
    addAsset = 'api/v1/assetTracking/addIndent';
    updateAsset = 'api/v1/assetTracking/updateIndent/'
    getAssetById = 'api/v1/assetTracking/getIndent?id='
    deleteAsset = 'api/v1/assetTracking/deleteIndent?id='
}

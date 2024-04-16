import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiUrls {

    // mainUrl = 'http://localhost:8090/';
    //  mainUrl = 'http://192.168.0.105:8090/';
    mainUrl = 'http://10.72.25.219:8091/';
    // mainUrl = environment.testPath;
    // mainUrl = 'https://sapi.whizzard.in/';


    getLoggedInUser = 'api/v1/test/user';
    getSitesDropDownForAsset = 'api/v1/assetTracking/indent/getSitesDropDownForAsset';
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
    getCustodianDetails = 'api/v1/assetTracking/indent/getCustodianDetails?'
    addCustodianQtyAndInvoiceNumber = 'api/v1/assetTracking/indent/addCustodianQtyAndInvoiceNumber?id='
    getVendorDetailsByPan = 'api/v1/vendorDetails/getVendorDetails?pan='
    rejectRequestForm = 'api/v1/assetTracking/indent/rejectRequestForm?id=';
    getRejectRequestForm = 'api/v1/assetTracking/indent/getRejectRequestForm'
    getRejectRequestFormCount = 'api/v1/assetTracking/indent/getRejectRequestFormCount'
    updateQuantityByVL = 'api/v1/assetTracking/indent/updateQuantityByVL/';


//  Asset or Add-Asset Api's

    searchAssets = 'api/v1/assetTracking/asset/searchAssets';
    countAssets = 'api/v1/assetTracking/asset/countAssets';
    getPaidVendorNumberDropDownForAddAsset = 'api/v1/assetTracking/asset/getPaidVendorNumberDropDownForAddAsset'
    getVendorPaymentByVendorNumber = 'api/v1/assetTracking/asset/getVendorPaymentByVendorNumber?vendorNumber='
    addAssetApi = 'api/v1/assetTracking/asset/addAsset';
    invoiceNumberForCapitalisation = 'api/v1/assetTracking/asset/getCapitalisedValue?invoiceNumber=';
    getForAssetById = 'api/v1/assetTracking/asset/getAssetBasedOnId?id='
    assetConfirmation = 'api/v1/assetTracking/asset/assetConfirmation/'
    searchActiveAssets = 'api/v1/assetTracking/asset/searchActiveAssets';
    countActiveAssets = 'api/v1/assetTracking/asset/countActiveAssets'

}

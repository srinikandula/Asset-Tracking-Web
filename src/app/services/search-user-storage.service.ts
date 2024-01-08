import {Injectable, NgZone} from '@angular/core';

interface StorageWrapper {
    get<T>(key: string): Promise<T | null>;

    remove(key: string): void;

    set(key: string, value: any): void;
}

interface StorageCache {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class SearchUserStorageService {

    // private storage: StorageWrapper;
    private static storage: any = {};
    private static tabNum: any;

    private static dashBoardFilterDataStorage: any = {};

    private static templateConfigurationsDataStorage: any = [];
    private static deliveredPackagesInfoDataGetStore: any = {};
    private static shiftTemplateDataStorage: any = {};
    private static autoVerifiedFiltersData: any = {};

    constructor() {
    }

    static get() {
        return this.storage;
    }

    static getTabNum() {
        return this.tabNum;
    }

    //
    // public remove(key: string): void {
    //   this.storage.remove( key );
    // }

    // public set(key: string, value: any): void {
    //   this.storage.set( key, value );
    // }

    static set(value: any) {
        this.storage = value;
    }
    static setTabNum(value: any) {
        this.tabNum = value;
    }

    static dashBoardFilterDataGet() {
        return this.dashBoardFilterDataStorage;
    }

    static dashBoardFilterDataSet(value: any) {
        this.dashBoardFilterDataStorage = value;
    }

    static deliveredPackagesInfoDataGet() {
        return this.deliveredPackagesInfoDataGetStore;
    }

    static deliveredPackagesInfoDataSet(value: any) {
        this.deliveredPackagesInfoDataGetStore = value;
    }

    static shiftTemplateDataSet(value: any){
        this.shiftTemplateDataStorage =  value;
    }

    static shiftTemplateDataGet(){
        return this.shiftTemplateDataStorage;
    }

    static autoVerifiedTripsFiltersSet(value: any) {
        this.autoVerifiedFiltersData = value;
    }

    static getAutoVerifiedTripsFilters() {
        return this.autoVerifiedFiltersData;
    }

}


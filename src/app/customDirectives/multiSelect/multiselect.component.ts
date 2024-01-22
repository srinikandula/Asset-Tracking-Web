import {
    Component,
    Input,
    Output,
    OnInit,
    ViewChild,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostListener,
    ElementRef,
    forwardRef,
    Renderer2
} from '@angular/core';
import {Observable, Subscription, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, throttleTime} from 'rxjs/operators';
import {FormGroup, FormControl} from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EqualPipe} from '../customPipes/equal.pipe';
import {FilterPipe} from '../customPipes/filter.pipe';
import {Renderer} from '@angular/compiler-cli/ngcc/src/rendering/renderer';
import {ListItem} from './multiselect.model';

const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Multiselect),
    multi: true
};

@Component({
    selector: 'app-multiselect',
    templateUrl: 'multiselect.html',
    host: {'(change)': 'manualChange()'},
    providers: [MULTISELECT_VALUE_ACCESSOR],
})

export class Multiselect implements OnInit, ControlValueAccessor {
    public items: Array<any>;
    public dataStoreItems: Array<any> = [];
    public copyItems: Array<any>;
    public selectedItems: Array<any> = [];
    public selectedItemsData: Array<any> = [];
    public localHeader: string;
    public isOpen = false;
    public enableFilter: boolean;
    public filterText = '';
    public filterPlaceholder: string;
    // public filterInput = new FormControl();
    public subscription: Subscription;

    public sourceDataType = null; // to keep note of the source data type. could be array of string/number/object
    public sourceDataFields: Array<any> = []; // store source data fields names

    @Input() itemsData: Observable<any[]>;
    @Input() headerTitle = '';
    @Input() selectedHeader = 'Options selected';
    @Input() optionLabel = '';
    @Input() optionValue = '';
    @Input() showSelected: boolean;
    @Input() underScorelessRemove: boolean;
    @Input() isDisabled: boolean | false;

    @Input()
    public set dataStore(value: Array<any>) {
        if (!value) {
            this.dataStoreItems = [];
        } else {
            const firstItem = value[0];
            this.sourceDataType = typeof firstItem;
            this.sourceDataFields = this.getFields(firstItem);
            this.dataStoreItems = value.map((item: any) =>
                typeof item === 'string' || typeof item === 'number'
                    ? new ListItem(item)
                    : new ListItem({
                        id: item[this.optionValue],
                        value: item[this.optionValue],
                        text: item[this.optionLabel] || item.attrs[this.optionLabel],
                        // isDisabled: item[this.settings.disabledField]
                    })
            );
            this.filterTextFun();
            this.enableFilter = true;
            this.filterText = '';
            this.filterPlaceholder = 'Filter..';
            // this.selectedItems = this.equalPipe.transform(this.dataStoreItems, {checked: true}, ListItem);
            this.setHeaderText();
        }
    }

    // ControlValueAccessor Interface and mutator
    private onChange = (_: any) => {};
    private onTouched = () => {};

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private equalPipe: EqualPipe,
        private filterPipe: FilterPipe,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    get selected(): any {
        return this.selectedItems;
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null && value.length > 0) {
            this.selectedItems = this.equalPipe.editTransform(this.dataStoreItems, {checked: true}, this.optionValue, value);
            this.setHeaderText();
        } else {
            this.selectedItems = [];
        }
    }

    filterTextFun(): void {
        // this.inputFilterObj = {text: this.filterText};
    }

    setHeaderText(): void {
        this.localHeader = this.headerTitle;
        const isArray = this.selectedItems instanceof Array;
        if (isArray && this.selectedItems.length > 1) {
            this.localHeader = this.selectedItems.length + ' ' + this.selectedHeader;
        } else if (isArray && this.selectedItems.length === 1) {
            this.localHeader = this.selectedItems[0].text;
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // this.renderer.setElementProperty(this.elRef.nativeElement, 'disabled', isDisabled);
        this.renderer.setProperty(this.elRef.nativeElement, 'disabled', isDisabled);
//    if (this.isOpen()) {
//      this._cRef.instance.setDisabledState(isDisabled);
//    }
    }

    manualChange(): void {
        // console.log('this.selectedItems', this.selectedItems);
        // this.selectedItemsData = [];
        this.onChange(this.selectedItemsData);
    }

    select(item: any): void {
        item.checked = !item.checked;
        this.selectedItems = this.equalPipe.transform(this.dataStoreItems, {checked: true}, this.optionValue);
        this.setHeaderText();
        if (this.selectedItems.length) {
            this.selectedItemsData = [];
            let si;
            for (si of this.selectedItems) {
                if (si[this.optionValue]) {
                    this.selectedItemsData.push(si[this.optionValue]);
                }else if (si.id) {
                    this.selectedItemsData.push(si.id);
                }
            }
        } else {
            this.selectedItemsData = [];
        }
        this.onChange(this.selectedItemsData);
    }

    checkAllAndUncheckAll(checkData): void {
        this.selectedItems = this.equalPipe.checkTransform(this.dataStoreItems, {checked: true}, checkData);
        this.setHeaderText();
        this.selectedItemsData = [];
        if (this.selectedItems.length === 0) {
            this.selectedItemsData = [];
        } else {
            let si;
            for (si of this.selectedItems) {
                if (si[this.optionValue]) {
                    this.selectedItemsData.push(si[this.optionValue]);
                }
            }
        }
        this.onChange(this.selectedItemsData);
    }

    toggleSelect(): void {
        this.isOpen = !this.isOpen;
    }

    clearFilter(): void {
        this.filterText = '';
        this.filterTextFun();
    }

    @HostListener('document:click', ['$event'])
    hostClick(event): void {
        // console.log(event.target);
        if (this.isOpen && !this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    ngOnInit(): void {
        // this.selectedItemsData = [];
        // this.subscription = this.itemsData.subscribe(res => {
        //     this.items = res;
        // });
        // this.subscription = this.itemsData.subscribe(res => this.copyItems = res);
        // this.subscription = this.itemsData.subscribe(res => this.allItems = res);
        // this.filterTextFun();
        // this.enableFilter = true;
        // this.filterText = '';
        // this.filterPlaceholder = 'Filter..';
        // this.selectedItems = this.equalPipe.transform(this.dataStoreItems, {checked: true}, this.optionValue);
        // this.setHeaderText();
        // this.filterInput
        //     .valueChanges
        //     .pipe(debounceTime(200))
        //     .pipe(distinctUntilChanged())
        //     .subscribe(term => {
        //         this.filterText = term;
        //         this.changeDetectorRef.markForCheck();
        //         // console.log(term);
        //     });
    }

    getFields(inputData): any[] {
        const fields = [];
        if (typeof inputData !== 'object') {
            return fields;
        }
        // tslint:disable-next-line:forin
        for (const prop in inputData) {
            fields.push(prop);
        }
        return fields;
    }
}

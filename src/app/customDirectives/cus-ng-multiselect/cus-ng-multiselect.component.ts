import {Component, forwardRef, Input, OnInit, Self} from '@angular/core';
import {any} from 'codelyzer/util/function';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {Multiselect} from '../multiSelect/multiselect.component';

// const MULTISELECT_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => CusNgMultiselectComponent),
//   multi: true
// };

@Component({
  selector: 'app-cus-ng-multiselect',
  templateUrl: './cus-ng-multiselect.component.html',
  styleUrls: ['./cus-ng-multiselect.component.css'],
  // host: {'(change)': 'manualChange()'},
  // providers: [MULTISELECT_VALUE_ACCESSOR],
})
export class CusNgMultiselectComponent implements OnInit, ControlValueAccessor {
  selectedValues: any;
  @Input() optionItems: any[];
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
  }

  selectAll(): void {}

  unselectAll(): void {}

  // manualChange(): void {
  //   this.onChange(this.selectedData);
  // }

  onChange(event): void {
    // debugger;
  }

  onTouched(): void {}

  onSelectionChange(selectedItems): void {
    // debugger;
    if (Array.isArray(selectedItems)) {
      const newList = selectedItems.map((x) => x.id);
      this.selectedValues = [...newList];
      this.onChange([...newList]);
    }
    this.onTouched();
  }

  writeValue(obj: any): void {
    console.log(obj);
    this.selectedValues = [...obj];
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
}

export interface IDropdownSettings {
  singleSelection?: boolean;
  idField?: string;
  textField?: string;
  disabledField?: string;
  enableCheckAll?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  allowSearchFilter?: boolean;
  clearSearchFilter?: boolean;
  maxHeight?: number;
  itemsShowLimit?: number;
  limitSelection?: number;
  searchPlaceholderText?: string;
  noDataAvailablePlaceholderText?: string;
  closeDropDownOnSelection?: boolean;
  showSelectedItemsAtTop?: boolean;
  defaultOpen?: boolean;
  allowRemoteDataSearch?: boolean;
}

export class ListItem {
  id: string | number;
  value: string | number;
  text: string | number;
  isDisabled?: boolean;
  checked?: boolean;

  public constructor(source: any) {
    if (typeof source === 'string' || typeof source === 'number') {
      this.id = this.text = source;
      this.value = this.text = source;
      this.isDisabled = false;
      this.checked = false;
    }
    if (typeof source === 'object') {
      this.id = source.id;
      this.value = source.value;
      this.text = source.text;
      this.isDisabled = source.isDisabled;
      this.checked = source.checked;
    }
  }
}

import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DropDownLists, DropDownConfig, calculateExtraItems, CalculateExtraItemInterface } from './select-models';
@Component({
  selector: 'app-ng-simple-multiselect-dropdown',
  templateUrl: './ng-simple-multiselect-dropdown.component.html',
  styleUrls: ['./ng-simple-multiselect-dropdown.component.scss']
})

export class NgSimpleMultiselectDropdownComponent implements OnInit {
  filter: string = '';
  selectedAll: boolean = false;
  toggleOptions: boolean = true;
  extraItems: number = 0;
  addedOptions: Array<DropDownLists> = [];
  displayAddedItems: Array<DropDownLists> = [];
  _listOptions: Array<DropDownLists> = [];
  disabledList: Array<any> = [];
  _totalAddedItems: number = 0;
  defaultConfig = {
    singleSelection: false,
    selectAllText: 'Select All',
    deSelectAllText: 'Deselect All',
    placeHolderText: 'Select an option!',
    search: true,
    disable: false,
    searchText: "Type here to search",
    noDataFound: "No result found!",
    maxSelectedCount: 4,
    selectionLimit: 0,
    valueKey: 'id',
    labelKey: 'label',
    searchMinTypeLength: 4
  };
  
  @Input() set
  listOptions(value: Array<DropDownLists>) {
    this._listOptions = value.map((option: any) => new DropDownLists({id: option[this.defaultConfig.valueKey],
        label: option[this.defaultConfig.labelKey],
        selected: option.selected,
        disabled: option.disabled}));
    this._listOptions = this._listOptions.filter(option => option.id);
    this.setAddedOptions();
    this.setValue();
  };
  
  @Input() set
  config(value: DropDownConfig) {
    this.defaultConfig = {...this.defaultConfig, ...value};
  }

  @Output()
  selectedResult: EventEmitter<Array<DropDownLists>> = new EventEmitter<Array<DropDownLists>>();

  @Output()
  addedItemResult: EventEmitter<DropDownLists> = new EventEmitter<DropDownLists>();

  @Output()
  removeItemResult: EventEmitter<DropDownLists> = new EventEmitter<DropDownLists>();

  @Output()
  removeAllResult: EventEmitter<Array<[]>> = new EventEmitter<Array<[]>>();

  @Output()
  addAllResult: EventEmitter<Array<DropDownLists>> = new EventEmitter<Array<DropDownLists>>();

  constructor() {}

  ngOnInit(): void {
    this.setAddedOptions();
    this.setValue();
  }

  setAddedOptions() {
    this.disabledList = this._listOptions.filter(option => option.disabled).map(option => option.id);
    const addedOptions = this._listOptions.filter(option => option.selected);
    this.addedOptions = this.defaultConfig.singleSelection && this.addedOptions.length > 1 ? addedOptions.slice(0,1) :
       addedOptions.slice(0, this.defaultConfig.selectionLimit || this._listOptions.length);
    if (this.defaultConfig.selectionLimit && this.defaultConfig.selectionLimit <= this.addedOptions.length) {
        return this.disableUnselectedOption();
    }
  }

  setValue(): void {
    if (this.addedOptions.length) {
      this.displayAddedItems = this.addedOptions.slice(0, (this.defaultConfig.maxSelectedCount));
      this.extraItems = calculateExtraItems<CalculateExtraItemInterface>(this.addedOptions.length,this.defaultConfig.maxSelectedCount);
    }
  }

  toggleDropDown(event: any, outsideDirective?: boolean): void {
    this.toggleOptions = outsideDirective? true : !this.toggleOptions;
  }

  selectOptions(event: Event, option: DropDownLists): void {
    if (this.defaultConfig.singleSelection) {
      this.addItem(option);
    } else {
      const selectedOptions = !option.selected;
      option.selected = selectedOptions;
      (() => !selectedOptions ? this.removeItem(option) : this.addItem(option))();
    }
    this.selectedResult.emit(this.addedOptions);
    event.preventDefault();
  }

  addItem(option: DropDownLists): void {
    if (this.defaultConfig.selectionLimit && this.defaultConfig.selectionLimit <= this.addedOptions.length) {
      return this.disableUnselectedOption();
    }
    (() => this.defaultConfig.singleSelection && this.addedOptions.length ? this.addedOptions = [option] :
       this.addedOptions.push(option))();
    this.setValue();
    this.addedItemResult.emit(option);
    if (this.defaultConfig.selectionLimit && this.defaultConfig.selectionLimit <= this.addedOptions.length) {
      return this.disableUnselectedOption();
    }
  }

  removeItem(option: DropDownLists): void {
    this.addedOptions = this.addedOptions.filter((addedOption: any) => addedOption.id !== option.id);
    this._listOptions = this._listOptions.map(item => ({...item, ...{selected: option.id === item.id ? false: item.selected}}));
    this.setValue();
    this.removeItemResult.emit(option);
    if (this.defaultConfig.selectionLimit && this.defaultConfig.selectionLimit >= this.addedOptions.length) {
      this.enableUnselectedOption();
    }
  }

  enableUnselectedOption() {
    this._listOptions = this._listOptions.map(option => ({...option, ...{disabled: this.disabledList.includes(option.id) ? true: false}}));
  }
  
  disableUnselectedOption() {
    this._listOptions = this._listOptions.map(option => ({...option, ...{selected: option.selected, 
      disabled: option.selected  ? false : true}}));
  }

  selectAll(event: Event): void {
    if (this.defaultConfig.singleSelection && this.addedOptions.length) {
      return;
    }
    (() => this.selectedAll ? this.removeAllItems() : this.addAllItems())();
    this.selectedAll = !this.selectedAll;
    this.selectedResult.emit(this.addedOptions);
  }

  addAllItems() {
    this.addedOptions = this._listOptions.filter((option: DropDownLists) => option.label.includes(this.filter));
    this._listOptions = this._listOptions.map((option: DropDownLists) => this.addedOptions.filter((a: DropDownLists) => 
    a.id === option.id).length > 0
    ? ({...option, ...{selected: true}}) : option);
    this.setValue();
    this.addAllResult.emit(this.listOptions);
  }

  removeAllItems() {
    this.addedOptions = [];
    this._listOptions = this._listOptions.map((option: DropDownLists) => ({...option, ...{selected: false}}));
    this.extraItems = 0;
    this.removeAllResult.emit([]);
  }

  removeAddedOption(option: DropDownLists): void {
    if (!option.id) {
      return;
    }
    this.addedOptions = this.addedOptions.filter(addedOption => addedOption.id !== option.id);
    const optionFound = this._listOptions.findIndex(item => item.id === option.id);
    this._listOptions = this._listOptions.map(item => ({...item, ...{selected: item.id === option.id ? false: item.selected,
      disabled: false}}));
    this._listOptions[optionFound].selected = false;
    this.setValue();
    this.selectedResult.emit(this.addedOptions);
  }

  search(event: any) {
    this.filter = event.target.value && event.target.value.length >= this.defaultConfig.searchMinTypeLength ? event.target.value :
      '';
  }
}

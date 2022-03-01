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
  
  @Input() set
  listOptions(value: Array<DropDownLists>) {
    this._listOptions = value;
    this.addedOptions = this._listOptions.filter(option => option.selected);
    this.setValue();
  };
  
  @Input()
  config: DropDownConfig = {
    singleSelection: false,
    selectAllText: 'Select All',
    deSelectAllText: 'Deselect All',
    placeHolderText: 'Select an option!',
    search: true,
    disable: false,
    searchText: "Type here to search",
    noDataFound: "No result found!",
    maxSelectedCount: 4
  };

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
    console.log('Hello!!!')
    this.addedOptions = this._listOptions.filter(option => option.selected);
    this.setValue();
  }

  setValue(): void {
    if (this.addedOptions.length) {
      this.displayAddedItems = this.addedOptions.slice(0, (this.config.maxSelectedCount || 4) + 1);
      this.extraItems = calculateExtraItems<CalculateExtraItemInterface>(this.addedOptions.length,this.config.maxSelectedCount || 4);
    }
  }

  toggleDropDown(event: any, outsideDirective?: boolean): void {
    this.toggleOptions = outsideDirective? true : !this.toggleOptions;
  }

  selectOptions(event: Event, option: DropDownLists): void {
    const selectedOptions = !option.selected;
    (() => !selectedOptions ? this.removeItem(option) : this.addItem(option))();
    option.selected = selectedOptions;
    this.selectedResult.emit(this.addedOptions);
  }

  addItem(option: DropDownLists): void {
    this.addedOptions.push(option);
    this.displayAddedItems = this.addedOptions.slice(0, (this.config.maxSelectedCount || 4) + 1);
    this.extraItems = calculateExtraItems<CalculateExtraItemInterface>(this.addedOptions.length,this.config.maxSelectedCount || 4);
    this.addedItemResult.emit(option);
  }

  removeItem(option: DropDownLists): void {
    this.addedOptions = this.addedOptions.filter(addedOption => addedOption.id !== option.id);
    this.extraItems = calculateExtraItems<CalculateExtraItemInterface>(this.addedOptions.length,this.config.maxSelectedCount || 4);;
    this.removeItemResult.emit(option);
  }

  selectAll(event: Event): void {
    (() => this.selectedAll ? this.removeAllItems() : this.addAllItems())();
    this.selectedAll = !this.selectedAll;
    this.selectedResult.emit(this.addedOptions);
  }

  addAllItems() {
    this.addedOptions = this._listOptions.filter((option: DropDownLists) => option.label.includes(this.filter));
    this._listOptions = this._listOptions.map((option: DropDownLists) => this.addedOptions.filter((a: DropDownLists) => a.id === option.id).length > 0
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
    this.setValue();
    this.selectedResult.emit(this.addedOptions);
  }

  search(event: any) {
    this.filter = event.target.value;
  }
}

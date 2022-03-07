export class DropDownLists {
    id: String;
    label: String;
    selected: Boolean;
    disabled: Boolean
    
    constructor(property: any) {
        this.id = property.id;
        this.label = property.label;
        this.selected = property.selected;
        this.disabled = property.disabled;
    }

};

export interface DropDownConfig {
    singleSelection: boolean,
    selectAllText?: string,
    deSelectAllText?: string,
    placeHolderText?: string,
    search?: boolean,
    disable?: boolean,
    selectionLimit?: number,
    searchText?: string,
    noDataFound?: string,
    maxSelectedCount? : number,
    valueKey?: string,
    labelKey?: string,
    searchMinTypeLength? : number
};

export interface CalculateExtraItemInterface {
    total: number,
    value: number
};


export function calculateExtraItems<T>(total: number, value: number): number {
   return total - value;
};
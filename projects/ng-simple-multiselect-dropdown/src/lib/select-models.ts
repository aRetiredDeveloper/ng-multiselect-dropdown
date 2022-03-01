export interface DropDownLists {
    id: number,
    label: string,
    selected: boolean
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
    maxSelectedCount? : number
};

export interface CalculateExtraItemInterface {
    total: number,
    value: number
};


export function calculateExtraItems<T>(total: number, value: number): number {
   return total - value;
};
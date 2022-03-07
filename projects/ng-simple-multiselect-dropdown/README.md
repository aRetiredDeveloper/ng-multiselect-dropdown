# Simple Angular MultiSelect Drop Down

A very simple and yet easy to use or integrate to your angular application. You can select multiple option via clicking on the input checkbox or the whole label itself. Selected options can be display as chips which you can remove it also very easily.
## Installation

Use the npm package manager [npm](https://www.npmjs.com/package/ng-simple-multiselect-dropdown) to install NgMultiSelectDropDown.

```bash
# For latest version, you can just use the below command on your terminal:-
npm i ng-simple-multiselect-dropdown

# For specific version, to install 0.0.3:-
npm install ng-simple-multiselect-dropdown@0.0.3
```

## Usage

```typescript
import { NgMultiSelectDropDownModule } from 'ng-simple-multiselect-dropdown';
// ...

# add in your app.module.ts or in your custom module in the imports array
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-angular';
  listOptions: any = [];
  selectedResult(event: any) {
    console.log(event);
  }

  # if you define selected: true then checkbox will be auto-clicked
  callApi() {
    this.listOptions = [
      { id: 1, label: "Pi-pie", selected: false },
      { id: 2, label: "Jane!", selected: true },
      { id: 3, label: "Sam", selected: false },
      { id: 4, label: "Hello Cassy!", selected: false },
      { id: 5, label: "hello Jany!", selected: true },
      { id: 6, label: "Hello Mossa", selected: false },
      { id: 7, label: "Hello Selly", selected: false },
      { id: 8, label: "hello Felixo!", selected: true },
      { id: 9, label: "Hello Nagaro", selected: false },
      { id: 10, label: "Hello Papicito", selected: false },
      { id: 11, label: "hello Ohoywah!", selected: true },
      { id: 12, label: "Hello Lolwa", selected: false },
  
    ];
  }
}
```


## app.component.html
```html
<app-ng-simple-multiselect-dropdown
  [listOptions]="listOptions"
  (selectedResult)="selectedResult($event)">
</app-ng-simple-multiselect-dropdown>
````

## Configuration Settings:-


| Config        | Type          | Description   |   Default Value |   Required    |
| ------------- | ------------- |---------------|-----------------|----------------
| selectAllText | string        | Select All text message on dropdown | Select All | optional | 
| deSelectAllText  | string     | Deselect All text message on dropdown to deselectAll | Deselect All | optional   |
| singleSelection | boolean     | User can select only one option if enable | false |  Required   |
| placeHolderText | string |  Placeholder message on dropdown button   | 'Select an option!' | optional     |
| search |  boolean | User can able to filter from the listOption | true |   optional   |
| disable | boolean | Disable the whole component   | false |    optional    |
 | searchText | string |  Custom message display for search placeholder | Type here to search | optional   |
|  noDataFound | string | Custom message to display when there is no data or no search result found using filter or from your api  |  No result found! | optional |
 | maxSelectedCount | number | It will display the option of +1, +2 after reaching it to maximum number option selection |  4 |  optional |
 | valueKey  |    string   |  Custom value key for drop down list eg id, value   | id |    optiobal   |
 |  labelKey |   string   |  Custom Label text to display in the dropdown list   |   label   |   optional   |
 |  searchMinTypeLength    | number    |  Minimum length required to filter label from the dropdown list options |  4   | optional |
 |   selectionLimit   | number   | Maximum a user can select or add from the dropdown list    |  0   | optional   |

## Output Methods

| Methods       | Description   | Usage        |
| ------------- | ------------- |---------------
| selectedResult |  It will give all the selected result in array format | (selectedResult)="selectedResult($event)" |
| addedItemResult  | It will give the item added by clicking on the label or checkbox(only one result) |(addedItemResult)="addedItemResult($event)" |
| removeItemResult | It will give the item removed either by clicking on the selected checkbox or label itself(only one item) | (addedItemResult)="addedItemResult($event)" |
| removeAllResult | It will always provide empty array list when we click on the Deselect All checkbox | (removeAllResult)="removeAllResult($event)" |
  addAllResult | It will give all the selected result ie all list present in the dropdown   | (addAllResult)="addAllResult($event)"    |
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Boring & Legal stuff
Copyright 2022 Joydeep Banerjee

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
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


| Config        | Type          | Description   |   Default Value |
| ------------- | ------------- |---------------|-----------------
| selectAllText | string        | Select All text message on dropdown | Select All |
| deSelectAllText  | string     | Deselect All text message on dropdown to deselectAll | Deselect All |




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
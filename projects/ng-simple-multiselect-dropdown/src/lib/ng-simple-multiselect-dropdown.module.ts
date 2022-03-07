
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSimpleMultiselectDropdownComponent } from './ng-simple-multiselect-dropdown.component';
import { EventClickOutsideDirective } from './event.directive';
import { MultiFilterSearch } from './ng-filter-search.pipe';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgSimpleMultiselectDropdownComponent, EventClickOutsideDirective, MultiFilterSearch],
  providers: [MultiFilterSearch],
  exports: [NgSimpleMultiselectDropdownComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class NgMultiSelectDropDownModule {
    static forRoot(): ModuleWithProviders<NgMultiSelectDropDownModule> {
      return {
        ngModule: NgMultiSelectDropDownModule
      };
    }
}
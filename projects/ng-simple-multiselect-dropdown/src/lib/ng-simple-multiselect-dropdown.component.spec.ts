import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSimpleMultiselectDropdownComponent } from './ng-simple-multiselect-dropdown.component';
import { MultiFilterSearch } from './ng-filter-search.pipe';

describe('NgMatMultiselectDropdownComponent', () => {
  let component: NgSimpleMultiselectDropdownComponent;
  let fixture: ComponentFixture<NgSimpleMultiselectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgSimpleMultiselectDropdownComponent, MultiFilterSearch ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSimpleMultiselectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

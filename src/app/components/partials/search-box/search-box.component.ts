import { Component, OnInit, Output, OnDestroy, Host } from '@angular/core';

import { BeerCatalogService } from '@services/beer-catalog.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { regex } from '@config/regex.config';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { API_ENDPOINTS } from '@config/api-endpoints.config';
import { BeerCatalogComponent } from '@components/beer-catalog/beer-catalog.component';

const formControls = {
  search_query: ['', [Validators.required, Validators.pattern(regex.allowedSearchQuery)]],
  search_by: ['name', [Validators.required]]
};

const MIN_DEBOUNCE = API_ENDPOINTS.punkAPI.debounceLimit;

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  @Output() public searchForm: FormGroup;

  constructor(
    // @Host() public parent: BeerCatalogComponent,
    private beerCatalogService: BeerCatalogService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group(formControls);
  }

  ngOnInit() {
    this.initListeners();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initListeners() {
    this.listenFormValueChanges();
  }

  private listenFormValueChanges() {
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(MIN_DEBOUNCE),
        distinctUntilChanged()
      )
      .subscribe(formValues => {
        if (this.searchForm.valid) {
          const { search_query, search_by } = formValues;
          this.beerCatalogService.loadBeerList(search_query, search_by);
        }
      });
  }

  get searchQueryFormControl() {
    return this.searchForm.get('search_query');
  }

  get searchQuery() {
    return this.searchQueryFormControl.value;
  }

  set searchQuery(query: string) {
    this.searchForm.patchValue({ search_query: query });
  }

  get searchByFormControl() {
    return this.searchForm.get('search_by');
  }

  public search(e) {
    if (this.searchForm.valid && this.beerCatalogService.lastUpdate.beerList < new Date().getTime() - MIN_DEBOUNCE) {
      const { search_query, search_by } = this.searchForm.value;
      this.beerCatalogService.loadBeerList(search_query, search_by);
    } else {
      console.warn(
        `[Request prevented due to multiple calls in less than a second]
Are you anxious for a drink? Take it easy! Let's meet in Dublin`
      );
    }
  }
}

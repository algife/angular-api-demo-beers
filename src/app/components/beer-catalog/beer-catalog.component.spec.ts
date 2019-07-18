import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCatalogComponent } from './beer-catalog.component';

describe('BeerCatalogComponent', () => {
  let component: BeerCatalogComponent;
  let fixture: ComponentFixture<BeerCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeerCatalogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the BeerCatalogComponent', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create a section for the random beer', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('#random-recommendation')).toBeTruthy();
  // });

  // it('should create a section for the search results', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('#search-results')).toBeTruthy();
  // });

  // it('should display the Search Results section title', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.search-results-title').textContent).toContain('Search Results');
  // });
});

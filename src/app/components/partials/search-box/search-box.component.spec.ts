import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the SearchBoxComponent', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should display the Search section title', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.search-results-title').textContent).toContain('Search Results');
  // });
});

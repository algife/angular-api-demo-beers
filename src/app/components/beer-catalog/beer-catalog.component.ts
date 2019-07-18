import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BeerCatalogService } from '@services/beer-catalog.service';
import { API_ENDPOINTS } from '@config/api-endpoints.config';

const MIN_DEBOUNCE = API_ENDPOINTS.punkAPI.debounceLimit;

@Component({
  selector: 'app-beer-catalog',
  templateUrl: './beer-catalog.component.html',
  styleUrls: ['./beer-catalog.component.scss']
})
export class BeerCatalogComponent implements OnDestroy {
  private destroyed$ = new Subject();

  constructor(private beerCatalogService: BeerCatalogService) {
    this.loadData();
  }

  // Emitter useful for the
  // Observable Unsubscription to avoid memory leaks in bigger applications
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get beerList() {
    return this.beerCatalogService.beerList;
  }
  get randomBeer() {
    return this.beerCatalogService.randomBeer;
  }

  private async loadData(): Promise<void> {
    this.beerCatalogService.getBeers();
  }

  public trackByFn(index, item): number {
    return index;
  }

  public async loadRandomBeer(nonAlcoholic: boolean = true): Promise<void> {
    if (this.beerCatalogService.lastUpdate.randomBeer < new Date().getTime() - MIN_DEBOUNCE) {
      this.beerCatalogService.getRandomBeerFromAPI(nonAlcoholic);
      this.beerCatalogService.lastUpdate.randomBeer = new Date().getTime();
    } else {
      console.warn(
        `[Request prevented due to multiple calls in less than a second]
Are you anxious for a drink? Take it easy! Let's meet in Dublin`
      );
    }
  }
}

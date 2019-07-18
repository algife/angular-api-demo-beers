import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Beer } from '@models/beer';
import { BeersResponse } from '@models/beers-response';
import { LastUpdateTime } from '@models/last-update-time';
import { BeerStore } from '@models/beer-store';
import { MOCK_BEER_LIST, MOCK_BEER_LIST_RANDOM } from '@mocks/mock-beer-list';
import { API_ENDPOINTS } from '@config/api-endpoints.config';

@Injectable({ providedIn: 'root' })
export class BeerCatalogService {
  public lastUpdate: LastUpdateTime = { beerList: -1, randomBeer: -1 };
  public nonAlcoholic = false;
  private store: BeerStore = {
    beerList: null,
    randomBeer: null
  };

  get beerList() {
    return this.store.beerList;
  }

  get randomBeer() {
    return this.store.randomBeer;
  }

  constructor(private http: HttpClient) {}

  public async getBeers(query = null, force = false): Promise<void> {
    this.loadBeerList();
    this.loadRandomBeer();
  }

  public async loadBeerList(query: string = null, searchBy: string = null): Promise<void> {
    // Perform a request to the API
    this.store.beerList = await this.getBeersFromAPI(query, searchBy);
    this.lastUpdate.beerList = new Date().getTime();
  }

  public async loadRandomBeer(nonAlcoholic: boolean = false): Promise<void> {
    this.store.randomBeer = await this.getRandomBeerFromAPI(nonAlcoholic);
    this.lastUpdate.randomBeer = new Date().getTime();
  }

  private async getBeersFromAPI(query: string, searchBy: string) {
    if (environment.useMockData && !environment.production) {
      return MOCK_BEER_LIST;
    }
    let endpointURL = `${API_ENDPOINTS.punkAPI.beers}`;

    // Which "Search By" option has been selected?
    if (searchBy === 'name') {
      endpointURL += `?beer_name=${query}`;
    }
    if (searchBy === 'brewed_before' && query.includes('-')) {
      endpointURL += `?brewed_before=${query}`;
    } else {
      console.warn('Dates should be formatted as MM-YYYY');
      return [];
    }
    let result;
    result = (await this.http
      .get(endpointURL)
      // .pipe(filter(searchFilterFn))
      .toPromise()
      .catch(err => [])) as any[];

    return result;
  }

  public async getRandomBeerFromAPI(nonAlcoholic: boolean) {
    if (environment.useMockData && !environment.production) {
      return MOCK_BEER_LIST_RANDOM[0];
    }
    this.nonAlcoholic = nonAlcoholic;
    let endpointURL = `${API_ENDPOINTS.punkAPI.beers}/random`;

    if (this.nonAlcoholic) {
      endpointURL += `?abv_lt=5`;
    }

    // Make the request and Get the first value of the array exclusively
    const randomBeer = ((await this.http
      .get(endpointURL)
      .toPromise()
      .catch(err => [])) as any[])[0];
    this.store.randomBeer = randomBeer;

    return randomBeer;
  }

  // public addBeer(...beers: Beer[]) {
  //   this.store.beerList.push(...beers);
  //   return;
  // }

  // public removeBeer(deletionId: number) {
  //   const targetBeer = this.store.beerList.find(beer => beer.id === deletionId);
  //   const index = this.store.beerList.indexOf(targetBeer);
  //   if (index > -1) {
  //     this.store.beerList.splice(index, 1);
  //   }
  // }
}

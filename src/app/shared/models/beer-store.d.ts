import { Beer } from './beer';

export interface BeerStore {
  beerList: Beer[];
  randomBeer: Beer;
}

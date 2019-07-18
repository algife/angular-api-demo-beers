import { Beer } from './beer';

export interface BeersResponse {
  beerList: Beer[];
  randomBeer: Beer;
}

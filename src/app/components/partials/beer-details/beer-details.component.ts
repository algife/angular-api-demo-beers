import { Component, OnInit, Input, Host } from '@angular/core';
import { Beer } from '@models/beer';
import { BeerCatalogComponent } from '../../beer-catalog/beer-catalog.component';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  @Input() public beer: Beer;
  @Input() public isRandomBeer = false;
  public noImageUrl = '//www.mayline.com/products/images/product/noimage.jpg';

  constructor(@Host() public parent: BeerCatalogComponent) {}

  ngOnInit() {}
}

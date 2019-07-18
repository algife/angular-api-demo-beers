import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerCatalogComponent } from './beer-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxModule } from '@components/partials/search-box/search-box.module';
import { BeerDetailsModule } from '@components/partials/beer-details/beer-details.module';

@NgModule({
  declarations: [BeerCatalogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchBoxModule, BeerDetailsModule]
})
export class BeerCatalogModule {}

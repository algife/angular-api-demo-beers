import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerDetailsComponent } from './beer-details.component';

@NgModule({
  declarations: [BeerDetailsComponent],
  exports: [BeerDetailsComponent],
  imports: [CommonModule]
})
export class BeerDetailsModule {}

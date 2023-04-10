import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiMarketComponent } from './thai-market.component';
import { SharedModule } from '../../shared/shared.module';
import { ThaiMarketRoutingModule } from './thai-market-routing.module';



@NgModule({
  declarations: [
    ThaiMarketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThaiMarketRoutingModule
  ]
})
export class ThaiMarketModule { }

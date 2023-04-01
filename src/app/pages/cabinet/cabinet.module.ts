import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetProfileComponent } from './cabinet-profile/cabinet-profile.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetFavoritesComponent } from './cabinet-favorites/cabinet-favorites.component';


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetProfileComponent,
    CabinetPasswordComponent,
    CabinetOrdersComponent,
    CabinetFavoritesComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }

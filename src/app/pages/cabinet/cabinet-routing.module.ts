import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { CabinetProfileComponent } from './cabinet-profile/cabinet-profile.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';
import { CabinetFavoritesComponent } from './cabinet-favorites/cabinet-favorites.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: 'profile', component: CabinetProfileComponent },
      { path: 'orders', component: CabinetOrdersComponent },
      { path: 'favorites', component: CabinetFavoritesComponent },
      { path: 'password', component: CabinetPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'profile' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';
import { CabinetProfileComponent } from './cabinet-profile/cabinet-profile.component';
import { CabinetComponent } from './cabinet.component';

const routes: Routes = [
  {
    path: '', component: CabinetComponent,
    children: [
      { path: 'profile', component: CabinetProfileComponent },
      { path: 'orders', component: CabinetOrdersComponent },
      { path: 'password', component: CabinetPasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }

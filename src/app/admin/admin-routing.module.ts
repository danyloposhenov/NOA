import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: 'category', component: AdminCategoriesComponent },
      { path: 'product', component: AdminProductsComponent },
      { path: 'order', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full' ,redirectTo: 'category' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
  
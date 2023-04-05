import { Component } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  public orders: IOrderResponse[] = [];

  constructor (
    private orderService: OrderService,
    private scroll: ScrollService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.scroll.scrollToTop();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data as IOrderResponse[];
    })
  }
}

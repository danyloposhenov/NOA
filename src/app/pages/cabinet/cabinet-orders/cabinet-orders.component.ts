import { Component } from '@angular/core';
import { IRegister } from 'src/app/shared/interfaces/account/account.interface';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-cabinet-orders',
  templateUrl: './cabinet-orders.component.html',
  styleUrls: ['./cabinet-orders.component.scss']
})
export class CabinetOrdersComponent {

  public myOrders: IOrderResponse[] = [];

  constructor (
    private orderService: OrderService,
    private scroll: ScrollService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.scroll.scrollToTop();
  }

  loadOrders(): void {
    if(localStorage.getItem('currentUser')) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      let currentID = currentUser['uid'];
      this.orderService.getOrdersForUser(currentID).subscribe(data => {
        let user = data as IRegister;
        this.myOrders = user['orders'] as IOrderResponse[];
      })
    }
  }

}

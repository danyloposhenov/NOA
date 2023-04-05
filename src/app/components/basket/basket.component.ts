import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  public basket: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  deleteFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex(prod => prod.id === product.id);
    basket = basket.filter(item => item !== basket[index]);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
    this.closeBasketDialog();
  }

  reduceAllBasket(): void {
    let basket: Array<IProductResponse> = [];
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
    this.closeBasketDialog();
  }

  closeBasketDialog(): void {
    let basket: Array<IProductResponse> = JSON.parse(localStorage.getItem('basket') as string);
    if (localStorage['basket'] && basket.length < 1) {
      this.dialog.closeAll();
      setTimeout(() => {
        this.router.navigate(['/product/culinasia-menu']);
      }, 500);
    }
  }

  orderSubmit(): void {
    this.dialog.closeAll();
    setTimeout(() => { this.router.navigate(['/checkout']) }, 500);
  }
}

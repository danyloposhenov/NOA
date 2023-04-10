import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public userProducts!: IProductResponse[];
  public eventSubscription!: Subscription;

  constructor (
    private router: Router,
    private orderService: OrderService,
    private scroll: ScrollService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.LoadProducts();
      }
    })
   }

  ngOnInit(): void {
    this.LoadProducts();
    this.scroll.scrollToTop();
  }

  LoadProducts(): void {
    this.userProducts = JSON.parse(localStorage.getItem('favorites') as string);
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

  deleteFavorite(product: IProductResponse): void {
    let prod: Array<IProductResponse> = JSON.parse(localStorage.getItem('favorites') as string);
    const index = prod.findIndex(prod => prod.id == product.id);
    prod = prod.filter(item => item != prod[index]);
    localStorage.setItem('favorites', JSON.stringify(prod));
    this.LoadProducts();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}

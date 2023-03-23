import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketComponent } from '../basket/basket.component';
import { CallbackComponent } from '../callback/callback.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public burgerList = false;
  public isLogin = false;
  public loginPage = '';
  public loginUrl = '';
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public amountProducts = 0;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.updateCheckUserLogin();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.amountProducts = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  updateCheckUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }
  openCallbackDialog(): void {
    this.dialog.open(CallbackComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'callback-dialog',
      autoFocus: false
    })
  }
  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }
  openBasketDialog(): void {
    this.dialog.open(BasketComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'basket-dialog',
      autoFocus: false,
    })
  }

  menu(): void {
    this.burgerList = !this.burgerList
  }

}

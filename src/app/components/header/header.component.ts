import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { BasketComponent } from '../basket/basket.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categoryProducts!: ICategoryResponse[];
  public categoryThai!: ICategoryResponse[];
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public isActive = false;
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public amountProducts = 0;
  public isMenu = false;

  constructor(
    public dialog: MatDialog,
    public categoryServive: CategoryService,
    public accountService: AccountService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.initCategory();
    this.checkUserLogin();
    this.updateCheckUserLogin();
    this.loadBasket();
    this.updateBasket();
  }

  initCategory(): void {
    this.categoryServive.getAll().subscribe(data => {
      this.categoryProducts = data as ICategoryResponse[];
      this.categoryProducts = this.categoryProducts
        .filter(prod => prod.path != 'thai-wok' && prod.path != 'thai-lava-grill' && prod.path != 'thai-satay');
      this.categoryThai = data as ICategoryResponse[];
      this.categoryThai = this.categoryThai
        .filter(prod => prod.path == 'thai-wok' || prod.path == 'thai-lava-grill' || prod.path == 'thai-satay');
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
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
    if (this.amountProducts > 0) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    })
  }
  openSideBar(): void {
    this.dialog.open(SideBarComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'side-bar-dialog',
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
}

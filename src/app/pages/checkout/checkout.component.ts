import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IRegister } from 'src/app/shared/interfaces/account/account.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { DeliveryService } from 'src/app/shared/services/delivery/delivery.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public userForm!: FormGroup;
  public currentUser!: IRegister;
  public choiceDelivery = true;
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public amountThings = 1;
  public payment = true;
  public restMoney = true;
  public comment = false;

  constructor(
    private orderService: OrderService,
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initUserForm();
    this.loadBasket();
    this.updateBasket();
    this.updateChoice();
  }

  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      building: [null, [Validators.required]],
      apartment: [null, [Validators.required]],
      entrance: [null],
      floor: [null],
      intercom: [null],
      payment: [null],
      comment: [null],
      restMoney: [null]
    });
    this.unloadUser();
  }

  unloadUser(): void {
    let user: IRegister = JSON.parse(localStorage.getItem('currentUser') as string);
    if (localStorage.getItem('currentUser') && user.role === ROLE.USER) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }

  updateChoice(): void {
    this.deliveryService.isDelivery$.subscribe(() => {
      if (localStorage.getItem('choiceDelivery')) {
        let delivery = localStorage.getItem('choiceDelivery') as string;
        if (delivery == 'courier') {
          this.choiceDelivery = true;
        } else {
          this.choiceDelivery = false;
        }
      }
    });
  }

  allBasketsData(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
      this.allBasketsData();
    } else if (!value && product.count > 1) {
      --product.count;
      this.allBasketsData();
    }
  }

  thingsCount(value: boolean): void {
    if (value) {
      ++this.amountThings;
    } else if (!value && this.amountThings > 1) {
      --this.amountThings;
    }
  }

  deleteFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = JSON.parse(localStorage.getItem('basket') as string);
    const index = basket.findIndex(prod => prod.id === product.id);
    basket = basket.filter(item => item !== basket[index]);
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  reduceAllBasket(): void {
    let basket: Array<IProductResponse> = [];
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  sortPayment(): void {
    this.payment = !this.payment;
    if (this.payment) {
      this.userForm.patchValue({
        payment: 'Готівка'
      });
      this.restMoney = true;
    } else {
      this.userForm.patchValue({
        payment: 'liqpay'
      })
    }

  }

  commentChange(): void {
    this.comment = !this.comment;

  }

  checkout(): void {
    let order = {
      userData: this.userForm.value,
      userBasket: this.basket,
      сhoiceDelivery: this.choiceDelivery ? "Кур'єр" : "Самовивіз",
      amountThings: this.amountThings
    };
    this.orderService.create(order).then(() => {
      this.reduceAllBasket();
      this.router.navigate(['/home']);
      this.toastr.success('Order successfully created');
    })
  }

}

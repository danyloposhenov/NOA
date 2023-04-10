import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const product1: IProductResponse = {
    id: 1,
    category: {
      id: 2,
      name: 'qqq',
      path: 'string',
      imagePath: 'qqq'
    },
    name: 'string',
    path: 'string',
    description: 'string',
    weight: '10',
    price: 10,
    imagePath: 'string',
    count: 2,
    favorite: true,
    extraPath: 'da'
  }
  const product2: IProductResponse = {
    id: 1,
    category: {
      id: 2,
      name: 'qqq',
      path: 'string',
      imagePath: 'qqq'
    },
    name: 'string',
    path: 'string',
    description: 'string',
    weight: '10',
    price: 15,
    imagePath: 'string',
    count: 3,
    favorite: true,
    extraPath: 'da'
  }
  const products = [
    {
      id: 1,
      category: {
        id: 2,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '10',
      price: 10,
      imagePath: 'string',
      count: 2,
      favorite: true,
      extraPath: 'da'
    },
    {
      id: 2,
      category: {
        id: 3,
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '10',
      price: 15,
      imagePath: 'string',
      count: 3,
      favorite: true,
      extraPath: 'da'
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment product count when value is true', () => {
    const product = { count: 1 } as any;
    component.productCount(product, true);
    expect(product.count).toBe(2);
  });

  it('should decrement product count when value is false and count is greater than 1', () => {
    const product = { count: 2 } as any;
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });

  it('should not decrement product count when value is false and count is 1', () => {
    const product = { count: 1 } as any;
    component.productCount(product, false);
    expect(product.count).toBe(1);
  });

  it('should calculate the total price of all products in the basket', () => {
    component.basket = [product1, product2];
    component.getTotalPrice();
    expect(component.total).toBe(65);
  });

  it('should load the basket from local storage and calculate the total price', () => {
    localStorage.clear();
    const products = [];
    products.push(product1);
    products.push(product2)
    localStorage.setItem('basket', JSON.stringify(products));
    component.loadBasket();
    expect(component.basket).toEqual(products);
    expect(component.total).toEqual(65);
  });

  it('should populate userForm with data from local storage when role is ROLE.USER', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'USER'
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    component.unloadUser();
    expect(component.userForm.get('firstName')?.value).toEqual('John');
    expect(component.userForm.get('lastName')?.value).toEqual('Doe');
    expect(component.userForm.get('phoneNumber')?.value).toEqual('1234567890');
    expect(component.userForm.get('email')?.value).toEqual('john.doe@example.com');
  });

  it('should not populate userForm with data from local storage when role is not ROLE.USER', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'ADMIN'
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    component.unloadUser();
    expect(component.userForm.get('firstName')?.value).toEqual(null);
    expect(component.userForm.get('lastName')?.value).toEqual(null);
    expect(component.userForm.get('phoneNumber')?.value).toEqual(null);
    expect(component.userForm.get('email')?.value).toEqual(null);
  });

  it('should increment amountThings when value is true', () => {
    component.amountThings = 5;
    const value = true;
    component.thingsCount(value);
    expect(component.amountThings).toEqual(6);
  });

  it('should decrement amountThings when value is false and amountThings > 1', () => {
    component.amountThings = 5;
    const value = false;
    component.thingsCount(value);
    expect(component.amountThings).toEqual(4);
  });

  it('should not decrement amountThings when value is false and amountThings <= 1', () => {
    component.amountThings = 1;
    const value = false;
    component.thingsCount(value);
    expect(component.amountThings).toEqual(1);
  });

  it('should set payment to "Готівка" and restMoney to true when payment is currently false', () => {
    component.payment = false;
    component.sortPayment();
    expect(component.payment).toBe(true);
    expect(component.userForm.get('payment')?.value).toBe('Готівка');
    expect(component.restMoney).toBe(true);
  });

  it('should set payment to "liqpay" and restMoney to false when payment is currently true', () => {
    component.payment = true;
    component.sortPayment();
    expect(component.payment).toBe(false);
    expect(component.userForm.get('payment')?.value).toBe('liqpay');
    expect(component.restMoney).toBe(true);
  });

});

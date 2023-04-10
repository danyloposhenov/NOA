import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {Component} from "@angular/core";
import {OrderService} from "../../shared/services/order/order.service";
;

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
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
      declarations: [ BasketComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
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

  it('should add product to empty basket', () => {
    localStorage.clear();
    component.addToBasket(product1);
    expect(localStorage.getItem('basket')).toBe(JSON.stringify([product1]));
  });


});

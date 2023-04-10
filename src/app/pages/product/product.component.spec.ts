import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from "../../../environments/environment";
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import {IProductResponse} from "../../shared/interfaces/product/product.interface";
import {ActivatedRoute} from "@angular/router";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let activatedRoute: ActivatedRoute;
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
    favorite: false,
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
      extraPath: 'true'
    },
    {
      id: 2,
      category: {
        id: 3,
        name: 'qqq',
        path: 'name',
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
      extraPath: 'false'
    }
  ]

  const products2 = [
    {
      id: '1',
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
      favorite: false,
      extraPath: 'true'
    },
    {
      id: '2',
      category: {
        id: 3,
        name: 'qqq',
        path: 'name',
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
      extraPath: 'false'
    }
  ]

  const product5: IProductResponse = {
    id: '1',
    category: {
      id: '2',
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
    favorite: false,
    extraPath: 'da'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'your_category' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
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

  it('should add product to empty basket', () => {
    localStorage.clear();
    component.addToBasket(product1);
    expect(localStorage.getItem('basket')).toBe(JSON.stringify([product1]));
  });

  it('should set isCulinasia to true and call LoadProducts and filter userProducts based on category when isCulinasia is false', () => {
    component.isCulinasia = true;
    component.choiceCulinasia();
    expect(component.isCulinasia).toBe(false);
    expect(products2.length).toBe(2);
    expect(products2[0].category.path).toBe('string');
  });

  it('should toggle isCulinasia property', () => {
    const originalValue = component.isCulinasia;
    component.choiceCulinasia();
    expect(component.isCulinasia).toEqual(!originalValue);
  });

  it('should filter userProducts based on isCulinasia property', () => {
    component.userProducts = products;
    const expectedFilteredProducts = products;
    component.choiceCulinasia();
    expect(component.userProducts).toEqual(expectedFilteredProducts);
  });


  it('should not throw error if userProducts is empty', () => {
    component.userProducts = [];
    expect(() => component.changePriceUp()).not.toThrow();
  });

  it('should sort userProducts by price in ascending order', () => {
    component.userProducts = products;
    component.changePriceUp();
    expect(products[0].id).toBe(1);
    expect(products[1].id).toBe(2);
  });

  it('should sort userProducts array in descending order by price', () => {
    component.userProducts = products;
    component.changePriceDown();
    expect(component.userProducts[0].price).toBe(15);
    expect(component.userProducts[1].price).toBe(10);
  });

  it('should update userProducts array with favorites correctly', () => {
    component.userProducts = products;
    localStorage.setItem('currentUser', 'user1');
    localStorage.setItem('favoritesForCurrentUser', JSON.stringify(products));
    component.updateFavoriteProducts();
    expect(component.userProducts[0].favorite).toBe(true);
    expect(component.userProducts[1].favorite).toBe(true);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favoritesForCurrentUser');
  });

  it('should add a product to favorites in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component.addFavorite(product5);
    expect(product5.favorite).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should add a product to favorites in localStorage if it is not already a favorite', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component.addFavorite(product5);
    expect(product5.favorite).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

});

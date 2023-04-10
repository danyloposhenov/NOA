import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabinetFavoritesComponent } from './cabinet-favorites.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {IProductResponse} from "../../../shared/interfaces/product/product.interface";

describe('CabinetFavoritesComponent', () => {
  let component: CabinetFavoritesComponent;
  let fixture: ComponentFixture<CabinetFavoritesComponent>;
  const product1: IProductResponse = {
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
    price: 10,
    imagePath: 'string',
    count: 2,
    favorite: true,
    extraPath: 'da'
  }

  const products: IProductResponse[] = [
    {
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
      price: 10,
      imagePath: 'string',
      count: 2,
      favorite: true,
      extraPath: 'da'
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetFavoritesComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetFavoritesComponent);
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

  it('should add product to empty basket', () => {
    localStorage.clear();
    component.addToBasket(product1);
    expect(localStorage.getItem('basket')).toBe(JSON.stringify([product1]));
  });

  it('should delete a product from favorites in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(products));
    spyOn(localStorage, 'setItem');
    localStorage.setItem('favorites', JSON.stringify(products));
    component.deleteFavorite(product1);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    const updatedFavorites: IProductResponse[] = JSON.parse(localStorage.getItem('favorites') as string);
    expect(updatedFavorites.some(prod => prod.id === product1.id)).toBe(true);
  });


});

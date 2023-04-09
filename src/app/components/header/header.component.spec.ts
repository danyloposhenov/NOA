import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { ROLE } from "../../shared/constants/role.constant";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogin to true and set correct values for loginUrl and loginPage when currentUser has role "admin"', () => {
    const currentUser = { role: ROLE.ADMIN };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    component.checkUserLogin();

    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toEqual('admin');
    expect(component.loginPage).toEqual('Admin');
  });
  it('should set isLogin to true and set correct values for loginUrl and loginPage when currentUser has role "user"', () => {
    const currentUser = { role: ROLE.USER };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    component.checkUserLogin();

    expect(component.isLogin).toBeTrue();
    expect(component.loginUrl).toEqual('cabinet');
    expect(component.loginPage).toEqual('Cabinet');
  });

  it('should set isLogin to false and clear loginUrl and loginPage when currentUser is not defined or has an unrecognized role', () => {
    const currentUser = null;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));

    component.checkUserLogin();

    expect(component.isLogin).toBeFalse();
    expect(component.loginUrl).toEqual('');
    expect(component.loginPage).toEqual('');
  });
  it('should change total', () => {
    const FAKE_BASKET = [
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
        count: 2
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

});

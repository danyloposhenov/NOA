import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ],
      providers: [
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set editStatus, isUploaded, list, and currentProductID correctly', () => {
    const product = {
      id: '123',
      category: {
        id: 'sds',
        name: 'qqq',
        path: 'string',
        imagePath: 'qqq'
      },
      name: 'Pizza',
      path: 'food-pizza',
      description: 'A delicious pizza',
      weight: '500',
      price: 10,
      favorite: true,
      extraPath: '1',
      count: 5,
      imagePath: 'https://example.com/pizza.jpg'
    };

    component.editProduct(product);

    expect(component.editStatus).toBeTrue();
    expect(component.isUploaded).toBeTrue();
    expect(component.list).toBeFalse();
    expect(component.currentProductID).toBe('123');
  });
});

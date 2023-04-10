import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetOrdersComponent } from './cabinet-orders.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';

describe('CabinetOrdersComponent', () => {
  let component: CabinetOrdersComponent;
  let fixture: ComponentFixture<CabinetOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetOrdersComponent ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

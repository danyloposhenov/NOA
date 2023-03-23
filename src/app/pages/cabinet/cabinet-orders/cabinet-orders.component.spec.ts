import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetOrdersComponent } from './cabinet-orders.component';

describe('CabinetOrdersComponent', () => {
  let component: CabinetOrdersComponent;
  let fixture: ComponentFixture<CabinetOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetOrdersComponent ]
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

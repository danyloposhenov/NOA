import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPasswordComponent } from './cabinet-password.component';

describe('CabinetPasswordComponent', () => {
  let component: CabinetPasswordComponent;
  let fixture: ComponentFixture<CabinetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetProfileComponent } from './cabinet-profile.component';

describe('CabinetProfileComponent', () => {
  let component: CabinetProfileComponent;
  let fixture: ComponentFixture<CabinetProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetFavoritesComponent } from './cabinet-favorites.component';

describe('CabinetFavoritesComponent', () => {
  let component: CabinetFavoritesComponent;
  let fixture: ComponentFixture<CabinetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

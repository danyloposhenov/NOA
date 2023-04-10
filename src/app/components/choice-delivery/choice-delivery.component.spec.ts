import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceDeliveryComponent } from './choice-delivery.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ChoiceDeliveryComponent', () => {
  let component: ChoiceDeliveryComponent;
  let fixture: ComponentFixture<ChoiceDeliveryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ChoiceDeliveryComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

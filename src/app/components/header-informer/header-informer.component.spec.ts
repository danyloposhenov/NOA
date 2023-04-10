import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInformerComponent } from './header-informer.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('HeaderInformerComponent', () => {
  let component: HeaderInformerComponent;
  let fixture: ComponentFixture<HeaderInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInformerComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set delivery to "Доставка кур\'єром" if choice is "courier"', () => {
    localStorage.setItem('choiceDelivery', 'courier');
    component.unloadChoice();
    expect(component.delivery).toEqual('Доставка кур\'єром');
  });

  it('should set delivery to "Самовивіз" if choice is not "courier"', () => {
    localStorage.setItem('choiceDelivery', 'some_other_value');
    component.unloadChoice();
    expect(component.delivery).toEqual('Самовивіз');
  });
});

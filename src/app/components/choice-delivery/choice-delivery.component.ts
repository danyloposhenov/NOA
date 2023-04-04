import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeliveryService } from 'src/app/shared/services/delivery/delivery.service';

@Component({
  selector: 'app-choice-delivery',
  templateUrl: './choice-delivery.component.html',
  styleUrls: ['./choice-delivery.component.scss']
})
export class ChoiceDeliveryComponent {

  constructor(
    private dialogRef: MatDialogRef<ChoiceDeliveryComponent>,
    public deliveryService: DeliveryService
  ) { }

  setDelivery(delivery: string): void {
    localStorage.setItem('choiceDelivery', delivery);
    this.dialogRef.close();
    this.deliveryService.isDelivery$.next(true);
  }
}

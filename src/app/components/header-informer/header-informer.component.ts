import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChoiceDeliveryComponent } from '../choice-delivery/choice-delivery.component';
import { DeliveryService } from 'src/app/shared/services/delivery/delivery.service';

@Component({
  selector: 'app-header-informer',
  templateUrl: './header-informer.component.html',
  styleUrls: ['./header-informer.component.scss']
})
export class HeaderInformerComponent {

  public delivery!: string;

  constructor(
    public dialog: MatDialog,
    public deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('choiceDelivery')) {
      this.openDeliveryDialog();
    } else {
      this.unloadChoice();
    }
    this.updateChoice();
  }

  unloadChoice(): void {
    let choice = localStorage.getItem('choiceDelivery') as string;
    if (choice == 'courier') {
      this.delivery = "Доставка кур'єром";
    } else {
      this.delivery = 'Самовивіз'
    }
  }

  updateChoice(): void {
    this.deliveryService.isDelivery$.subscribe(() => {
      this.unloadChoice();
    });
  }

  openDeliveryDialog(): void {
    this.dialog.open(ChoiceDeliveryComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'choice-delivery-dialog',
      autoFocus: false,
    })
  }

}

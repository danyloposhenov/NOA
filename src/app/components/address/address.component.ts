import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  public addressForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.initCallForm();
  }

  initCallForm(): void {
    this.addressForm = this.fb.group({
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      building: [null, [Validators.required]],
      apartment: [null, [Validators.required]],
      entrance: [null],
      floor: [null],
      intercom: [null]
    })
  }

  addAddress(): void {
    if (localStorage.getItem('currentUser')) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      let currentID = currentUser['uid'];
      currentUser['address'].push(this.addressForm.value);
      localStorage.setItem('currentUser', currentUser);
      this.orderService.updateUserOrders(currentUser, currentID);
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  public addressForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
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

  }

}
